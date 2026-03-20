import { Router } from "express";
import auth from "../middlewares/auth.js";
import cAdmin from "../controllers/cAdmin.js";
import { validate } from "../middlewares/validate.js";
import { extendBookingSchema } from "../schemas/booking.schema.js";
const routes = Router();
/* METHOD GET */
routes.get("/api/admin/bookings", auth.authenticateToken, auth.authorizeRoles("Admin"), cAdmin.getBookings);
/* METHOD GET */
routes.get("/api/admin/stats", auth.authenticateToken, auth.authorizeRoles("Admin"), cAdmin.getAllStats);
/* METHOD PUT */
routes.put("/api/admin/spaces/:id", auth.authenticateToken, auth.authorizeRoles("Admin"), validate(extendBookingSchema, "body"), cAdmin.extendBooking);
export default routes;
//# sourceMappingURL=rAdmin.js.map