import error from "../middlewares/error.js";
import pricingService from "../services/pricing.service.js";
import { withTransaction } from "../utils/transaction.js";
import { AppError } from "../utils/AppError.js";
const cBooking = {
    /**
     * POST /api/bookings
     * Crea una reserva con transacción atómica:
     *   1. Lock espacio (FOR UPDATE)
     *   2. Verificar membresía
     *   3. Verificar solapamiento
     *   4. Calcular precio dinámico
     *   5. INSERT Booking + INSERT Pay (atómico)
     */
    createBooking: async (request, response) => {
        try {
            const user_id = request.user.id;
            const { spaces_id, timeDate, timeFrom, until, numberPersons } = request.body;
            const result = await withTransaction(async (conn) => {
                // 1. Lock espacio con FOR UPDATE para prevenir concurrencia
                const [spaces] = await conn.query(`SELECT s.spaces_id, st.priceHour, st.priceDay, st.membershipType_id, st.capacity
                     FROM Spaces s
                     INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                     WHERE s.spaces_id = ? FOR UPDATE`, [spaces_id]);
                if (!spaces[0])
                    throw new AppError(404, "Espacio no encontrado");
                // 2. Verificar membresía del usuario
                const [users] = await conn.query("SELECT membershipType_id FROM Users WHERE user_id = ?", [user_id]);
                if (!users[0])
                    throw new AppError(404, "Usuario no encontrado");
                if (users[0].membershipType_id < spaces[0].membershipType_id) {
                    throw new AppError(403, "Tu membresía no tiene acceso a este tipo de espacio. Se requiere un nivel de membresía superior.");
                }
                // 3. Verificar solapamiento (dentro de la transacción con lock)
                const [overlaps] = await conn.query(`SELECT 1 FROM Bookings
                     WHERE spaces_id = ? AND timeDate = ?
                       AND statusbooking_id IN (1, 2)
                       AND timeFrom < ? AND until > ?
                     LIMIT 1`, [spaces_id, timeDate, until, timeFrom]);
                if (overlaps.length > 0) {
                    throw new AppError(409, "Horario no disponible. Existe solapamiento con otra reservación en este espacio.");
                }
                // 4. Calcular precio dinámico con el motor de estrategias
                const hours = (new Date(`${timeDate}T${until}`).getTime() - new Date(`${timeDate}T${timeFrom}`).getTime()) / (1000 * 60 * 60);
                const pricing = pricingService.calculate({
                    baseRatePerHour: Number(spaces[0].priceHour),
                    hours,
                    dayOfWeek: new Date(timeDate).getDay(),
                    userMembershipTypeId: users[0].membershipType_id,
                    spacesMembershipTypeId: spaces[0].membershipType_id,
                });
                // 5. INSERT Booking
                const [bookingResult] = await conn.query(`INSERT INTO Bookings 
                        (user_id, spaces_id, statusbooking_id, numberPersons, dateAct, timeDate, timeFrom, until)
                     VALUES (?, ?, 2, ?, NOW(), ?, ?, ?)`, [user_id, spaces_id, numberPersons || 1, timeDate, timeFrom, until]);
                // 6. INSERT Pay (atómico con el booking)
                const [payResult] = await conn.query("INSERT INTO Pays (booking_id, statusPay_id, totalPay) VALUES (?, 1, ?)", [bookingResult.insertId, pricing.total]);
                return {
                    bookingId: bookingResult.insertId,
                    payId: payResult.insertId,
                    pricing
                };
            });
            response.status(201).json({
                message: "Reserva realizada con éxito",
                bookingId: result.bookingId,
                pricing: result.pricing,
            });
        }
        catch (err) {
            if (err instanceof AppError) {
                return response.status(err.statusCode).json({
                    error: true,
                    title: `Error ${err.statusCode}`,
                    message: err.message,
                });
            }
            error.e500(request, response, err);
        }
    },
    /**
     * GET /api/bookings
     * Obtiene todas las reservas del usuario autenticado.
     */
    getBookings: async (request, response) => {
        try {
            const user_id = request.user.id;
            const db = (await import("../config/db.js")).default;
            const [bookings] = await db.query(`SELECT 
                    b.booking_id, b.user_id, b.spaces_id,
                    s.spacesType_id, st.spacesType,
                    st.membershipType_id, ms.membershipType,
                    st.capacity, st.priceHour, st.priceDay,
                    s.location_id, l.location,
                    b.statusbooking_id, sb.statusbooking,
                    b.dateAct, b.timeDate, b.timeFrom, b.until,
                    p.totalPay
                FROM Bookings b
                INNER JOIN Spaces s ON b.spaces_id = s.spaces_id
                INNER JOIN StatusBookings sb ON b.statusbooking_id = sb.statusbooking_id
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                INNER JOIN Locations l ON s.location_id = l.location_id
                INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id
                LEFT JOIN Pays p ON b.booking_id = p.booking_id
                WHERE b.user_id = ?`, [user_id]);
            response.json({ message: "Consulta realizada con éxito", bookings });
        }
        catch (err) {
            error.e500(request, response, err);
        }
    },
    /**
     * GET /api/bookings/:id
     * Obtiene una reserva específica del usuario autenticado.
     */
    getBooking: async (request, response) => {
        try {
            const user_id = request.user.id;
            const id = request.params.id;
            const db = (await import("../config/db.js")).default;
            const [bookings] = await db.query(`SELECT 
                    b.booking_id, b.user_id, b.spaces_id,
                    s.spacesType_id, st.spacesType,
                    st.membershipType_id, ms.membershipType,
                    st.capacity, st.priceHour, st.priceDay,
                    s.location_id, l.location,
                    b.statusbooking_id, sb.statusbooking,
                    b.dateAct, b.timeDate, b.timeFrom, b.until,
                    p.totalPay
                FROM Bookings b
                INNER JOIN Spaces s ON b.spaces_id = s.spaces_id
                INNER JOIN StatusBookings sb ON b.statusbooking_id = sb.statusbooking_id
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                INNER JOIN Locations l ON s.location_id = l.location_id
                INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id
                LEFT JOIN Pays p ON b.booking_id = p.booking_id
                WHERE b.user_id = ? AND b.booking_id = ?`, [user_id, id]);
            if (!bookings[0]) {
                return error.e404(request, response, { message: "Reservación no encontrada" });
            }
            response.json({ message: "Consulta realizada con éxito", booking: bookings[0] });
        }
        catch (err) {
            error.e500(request, response, err);
        }
    },
    /**
     * PUT /api/bookings/:id/cancel
     * Cancela una reserva con transacción atómica:
     *   1. Lock reserva (FOR UPDATE)
     *   2. Calcular reembolso basado en diferencia horaria
     *   3. UPDATE estado + INSERT reembolso + UPDATE pago (atómico)
     */
    cancelBooking: async (request, response) => {
        try {
            const user_id = request.user.id;
            const booking_id = request.params.id;
            const result = await withTransaction(async (conn) => {
                // 1. Lock la reserva y obtener datos del pago
                const [bookings] = await conn.query(`SELECT b.*, p.totalPay, p.statusPay_id
                     FROM Bookings b
                     INNER JOIN Pays p ON b.booking_id = p.booking_id
                     WHERE b.booking_id = ? AND b.user_id = ?
                     FOR UPDATE`, [booking_id, user_id]);
                if (!bookings[0])
                    throw new AppError(404, "Reservación no encontrada. Asegúrese de haber ingresado los datos de una reserva que usted haya realizado.");
                if (bookings[0].statusbooking_id === 3)
                    throw new AppError(409, "Esta reserva ya fue cancelada anteriormente.");
                if (bookings[0].statusbooking_id === 4)
                    throw new AppError(409, "No se puede cancelar una reserva que ya fue completada.");
                // 2. Calcular reembolso basado en tiempo restante
                const timeDateStr = new Date(bookings[0].timeDate).toISOString().slice(0, 10);
                const bookingStartTime = new Date(`${timeDateStr}T${bookings[0].timeFrom}`);
                const now = new Date();
                const hoursUntilBooking = (bookingStartTime.getTime() - now.getTime()) / (1000 * 60 * 60);
                let refundPercent;
                if (hoursUntilBooking > 24) {
                    refundPercent = 100;
                }
                else if (hoursUntilBooking >= 12) {
                    refundPercent = 50;
                }
                else {
                    refundPercent = 0;
                }
                // BUG FIX: usar totalPay real, no priceHour
                const totalRefund = Math.round(Number(bookings[0].totalPay) * (refundPercent / 100) * 100) / 100;
                // 3. UPDATE estado a cancelado
                await conn.query("UPDATE Bookings SET statusbooking_id = 3 WHERE booking_id = ?", [booking_id]);
                // 4. INSERT registro de reembolso
                await conn.query("INSERT INTO Refunds (dateAct, refundPercent, booking_id, totalRefund) VALUES (NOW(), ?, ?, ?)", [refundPercent, booking_id, totalRefund]);
                // 5. UPDATE estado del pago a refund
                if (refundPercent > 0) {
                    await conn.query("UPDATE Pays SET statusPay_id = 2 WHERE booking_id = ?", [booking_id]);
                }
                return { refundPercent, totalRefund };
            });
            response.json({
                message: `Cancelación realizada con éxito. Reembolso: ${result.refundPercent}%, Total reembolsado: RD$${result.totalRefund}`,
                refundPercent: result.refundPercent,
                totalRefund: result.totalRefund,
            });
        }
        catch (err) {
            if (err instanceof AppError) {
                return response.status(err.statusCode).json({
                    error: true,
                    title: `Error ${err.statusCode}`,
                    message: err.message,
                });
            }
            error.e500(request, response, err);
        }
    },
    /**
     * PATCH /api/bookings/:id/extend
     * Extiende una reserva con transacción atómica:
     *   1. Lock reserva
     *   2. Verificar solapamiento para el nuevo rango
     *   3. Recalcular precio
     *   4. UPDATE booking + UPDATE pay (atómico)
     */
    extendBooking: async (request, response) => {
        try {
            const user_id = request.user.id;
            const booking_id = request.params.id;
            const { until } = request.body;
            const result = await withTransaction(async (conn) => {
                // 1. Lock la reserva actual
                const [bookings] = await conn.query(`SELECT b.*, st.priceHour, st.membershipType_id as spaceMembershipTypeId,
                            u.membershipType_id as userMembershipTypeId
                     FROM Bookings b
                     INNER JOIN Spaces s ON b.spaces_id = s.spaces_id
                     INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                     INNER JOIN Users u ON b.user_id = u.user_id
                     WHERE b.booking_id = ? AND b.user_id = ?
                     FOR UPDATE`, [booking_id, user_id]);
                if (!bookings[0])
                    throw new AppError(404, "Reservación no encontrada");
                if (bookings[0].statusbooking_id !== 2)
                    throw new AppError(409, "Solo se pueden extender reservaciones confirmadas.");
                const timeDateStr = new Date(bookings[0].timeDate).toISOString().slice(0, 10);
                // 2. Verificar solapamiento para la extensión
                const [overlaps] = await conn.query(`SELECT 1 FROM Bookings
                     WHERE spaces_id = ? AND timeDate = ?
                       AND booking_id != ?
                       AND statusbooking_id IN (1, 2)
                       AND timeFrom < ? AND until > ?
                     LIMIT 1`, [bookings[0].spaces_id, timeDateStr, booking_id, until, bookings[0].until]);
                if (overlaps.length > 0) {
                    throw new AppError(409, "No se puede extender. Existe solapamiento con otra reservación.");
                }
                // 3. Recalcular precio con el nuevo rango completo
                const hours = (new Date(`${timeDateStr}T${until}`).getTime() - new Date(`${timeDateStr}T${bookings[0].timeFrom}`).getTime()) / (1000 * 60 * 60);
                const pricing = pricingService.calculate({
                    baseRatePerHour: Number(bookings[0].priceHour),
                    hours,
                    dayOfWeek: new Date(timeDateStr).getDay(),
                    userMembershipTypeId: bookings[0].userMembershipTypeId,
                    spacesMembershipTypeId: bookings[0].spaceMembershipTypeId,
                });
                // 4. UPDATE booking
                await conn.query("UPDATE Bookings SET until = ? WHERE booking_id = ?", [until, booking_id]);
                // 5. UPDATE pago
                await conn.query("UPDATE Pays SET totalPay = ? WHERE booking_id = ?", [pricing.total, booking_id]);
                return { pricing, newUntil: until };
            });
            response.json({
                message: "Reserva extendida con éxito",
                pricing: result.pricing,
                newUntil: result.newUntil,
            });
        }
        catch (err) {
            if (err instanceof AppError) {
                return response.status(err.statusCode).json({
                    error: true,
                    title: `Error ${err.statusCode}`,
                    message: err.message,
                });
            }
            error.e500(request, response, err);
        }
    }
};
export default cBooking;
//# sourceMappingURL=cBooking.js.map