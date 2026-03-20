import { Router } from "express";
import auth from "../middlewares/auth.js";
import cAdmin from "../controllers/cAdmin.js";
import { validate } from "../middlewares/validate.js";
import { extendBookingSchema } from "../schemas/booking.schema.js";

const routes = Router();

/**
 * @openapi
 * /api/admin/bookings:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all bookings (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 *       403:
 *         description: Forbidden
 */
routes.get(
    "/api/admin/bookings",
    auth.authenticateToken,
    auth.authorizeRoles("Admin"),
    cAdmin.getBookings
);
/**
 * @openapi
 * /api/admin/stats:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get system statistics (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overall system stats
 *       403:
 *         description: Forbidden
 */
routes.get(
    "/api/admin/stats",
    auth.authenticateToken,
    auth.authorizeRoles("Admin"),
    cAdmin.getAllStats
);
/**
 * @openapi
 * /api/admin/spaces/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update space details (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Space updated
 *       403:
 *         description: Forbidden
 */
routes.put(
    "/api/admin/spaces/:id",
    auth.authenticateToken,
    auth.authorizeRoles("Admin"),
    validate(extendBookingSchema, "body"),
    cAdmin.extendBooking
);

export default routes;