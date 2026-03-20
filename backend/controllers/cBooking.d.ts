import type { Request, Response } from "express";
declare const cBooking: {
    /**
     * POST /api/bookings
     * Crea una reserva con transacción atómica:
     *   1. Lock espacio (FOR UPDATE)
     *   2. Verificar membresía
     *   3. Verificar solapamiento
     *   4. Calcular precio dinámico
     *   5. INSERT Booking + INSERT Pay (atómico)
     */
    createBooking: (request: Request, response: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /api/bookings
     * Obtiene todas las reservas del usuario autenticado.
     */
    getBookings: (request: Request, response: Response) => Promise<void>;
    /**
     * GET /api/bookings/:id
     * Obtiene una reserva específica del usuario autenticado.
     */
    getBooking: (request: Request, response: Response) => Promise<void>;
    /**
     * PUT /api/bookings/:id/cancel
     * Cancela una reserva con transacción atómica:
     *   1. Lock reserva (FOR UPDATE)
     *   2. Calcular reembolso basado en diferencia horaria
     *   3. UPDATE estado + INSERT reembolso + UPDATE pago (atómico)
     */
    cancelBooking: (request: Request, response: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PATCH /api/bookings/:id/extend
     * Extiende una reserva con transacción atómica:
     *   1. Lock reserva
     *   2. Verificar solapamiento para el nuevo rango
     *   3. Recalcular precio
     *   4. UPDATE booking + UPDATE pay (atómico)
     */
    extendBooking: (request: Request, response: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default cBooking;
//# sourceMappingURL=cBooking.d.ts.map