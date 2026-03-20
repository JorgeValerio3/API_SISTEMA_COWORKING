import error from "../middlewares/error.js";
import mBooking from "../models/mBooking.js";
import mSpaces from "../models/mSpaces.js";
const cAdmin = {
    getBookings: async (request, response) => {
        try {
            const user_id = request.user.id;
            const bookings = await mBooking.getBookings(user_id);
            response.json({
                message: "Consulta Realizada con Exito",
                bookings
            });
        }
        catch (err) {
            error.e500(request, response, err);
        }
    },
    getAllStats: async (request, response) => {
        try {
            const user_id = request.user.id;
            const id = Number(request.params.id);
            const bookings = await mBooking.getBooking(user_id, id);
            response.json({
                message: "Consulta Realizada con Exito",
                booking: bookings
            });
        }
        catch (err) {
            error.e500(request, response, err);
        }
    },
    extendBooking: async (request, response) => {
        try {
            const user_id = request.user.id;
            const booking_id = Number(request.params.id);
            const { until } = request.body;
            const bookings = await mBooking.getBooking(user_id, booking_id);
            if (!bookings || bookings.length === 0) {
                return error.e404(request, response, { message: "Booking not found or not owned by admin" });
            }
            const booking = bookings[0];
            // Explicit check for undefined strictly required by TS even if length > 0 checked
            if (!booking)
                return error.e404(request, response, { message: "Booking not found" });
            const timeDate = new Date(booking.timeDate).toISOString().slice(0, 10);
            const timeFrom = booking.until;
            const timeFrom1 = booking.timeFrom;
            // Check availability
            const searchAva = await mSpaces.getSpaceAvailable({ timeDate, timeFrom, until });
            const isAvailable = searchAva.some((el) => Number(el.spaces_id) === Number(booking.spaces_id));
            if (!isAvailable)
                return error.e409(request, response, {
                    message: "Valores en Conflicto, no puedes extender una reservacion encima de otra reservacion."
                });
            // Perform extension
            const uddateBooking = await mBooking.extendBooking({ user_id, booking_id, until });
            // Calculate new pay
            const hours = (new Date(`${timeDate}T${until}`).getTime() - new Date(`${timeDate}T${timeFrom1}`).getTime()) / (1000 * 60 * 60);
            const totalPay = booking.priceHour * hours;
            const pay = await mBooking.updatePayBooking({ booking_id, totalPay });
            response.json({
                message: "Reserva extendida con Exito",
                booking: bookings,
                uddateBooking,
                pay,
                until
            });
        }
        catch (err) {
            error.e500(request, response, err);
        }
    }
};
export default cAdmin;
//# sourceMappingURL=cAdmin.js.map