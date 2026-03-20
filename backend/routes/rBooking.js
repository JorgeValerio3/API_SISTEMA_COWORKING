import { Router } from "express";
import auth from "../middlewares/auth.js";
import cBooking from "../controllers/cBooking.js";
import { validate } from "../middlewares/validate.js";
import { createBookingSchema, extendBookingSchema, idParamSchema } from "../schemas/booking.schema.js";
const routes = Router();
/* POST: Crear nueva reserva */
routes.post("/api/bookings", auth.authenticateToken, validate(createBookingSchema, "body"), cBooking.createBooking);
/* GET: Listar reservas del usuario */
routes.get("/api/bookings", auth.authenticateToken, cBooking.getBookings);
/* GET: Obtener una reserva por ID */
routes.get("/api/bookings/:id", auth.authenticateToken, validate(idParamSchema, "params"), cBooking.getBooking);
/* PUT: Cancelar una reserva */
routes.put("/api/bookings/:id/cancel", auth.authenticateToken, validate(idParamSchema, "params"), cBooking.cancelBooking);
/* PATCH: Extender una reserva */
routes.patch("/api/bookings/:id/extend", auth.authenticateToken, validate(idParamSchema, "params"), validate(extendBookingSchema, "body"), cBooking.extendBooking);
export default routes;
//# sourceMappingURL=rBooking.js.map