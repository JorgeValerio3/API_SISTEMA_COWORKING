import { Router } from "express";
import auth from "../middlewares/auth.js";
import cBooking from "../controllers/cBooking.js";
import { validate } from "../middlewares/validate.js";
import { createBookingSchema, extendBookingSchema, idParamSchema } from "../schemas/booking.schema.js";

const routes = Router();

/**
 * @openapi
 * /api/bookings:
 *   post:
 *     tags:
 *       - Bookings
 *     summary: Create a new booking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - spaces_id
 *               - timeDate
 *               - timeFrom
 *               - until
 *             properties:
 *               spaces_id:
 *                 type: integer
 *               timeDate:
 *                 type: string
 *                 format: date
 *               timeFrom:
 *                 type: string
 *                 example: "08:00:00"
 *               until:
 *                 type: string
 *                 example: "10:00:00"
 *               numberPersons:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid input or overlapping booking
 */
routes.post(
    "/api/bookings",
    auth.authenticateToken,
    validate(createBookingSchema, "body"),
    cBooking.createBooking
);

/**
 * @openapi
 * /api/bookings:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get all bookings for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */
routes.get(
    "/api/bookings",
    auth.authenticateToken,
    cBooking.getBookings
);

/**
 * @openapi
 * /api/bookings/{id}:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get a specific booking by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 */
routes.get(
    "/api/bookings/:id",
    auth.authenticateToken,
    validate(idParamSchema, "params"),
    cBooking.getBooking
);

/**
 * @openapi
 * /api/bookings/{id}/cancel:
 *   put:
 *     tags:
 *       - Bookings
 *     summary: Cancel a booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking cancelled
 *       404:
 *         description: Booking not found
 */
routes.put(
    "/api/bookings/:id/cancel",
    auth.authenticateToken,
    validate(idParamSchema, "params"),
    cBooking.cancelBooking
);

/**
 * @openapi
 * /api/bookings/{id}/extend:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Extend a booking
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
 *             required:
 *               - until
 *             properties:
 *               until:
 *                 type: string
 *                 example: "12:00:00"
 *     responses:
 *       200:
 *         description: Booking extended
 *       400:
 *         description: Invalid time or conflict
 */
routes.patch(
    "/api/bookings/:id/extend",
    auth.authenticateToken,
    validate(idParamSchema, "params"),
    validate(extendBookingSchema, "body"),
    cBooking.extendBooking
);

export default routes;