import { Router } from "express";
import auth from "../middlewares/auth.js";
import cSpaces from "../controllers/cSpaces.js";
import { validate } from "../middlewares/validate.js";
import { getSpaceAvailableSchema, idParamSchema } from "../schemas/spaces.schema.js";

const routes = Router();

/**
 * @openapi
 * /api/spaces:
 *   get:
 *     tags:
 *       - Spaces
 *     summary: Retrieve all spaces
 *     description: Returns a list of all coworking spaces.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of spaces.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 spaces:
 *                   type: array
 *                   items:
 *                     type: object
 */
routes.get(
    "/api/spaces",
    auth.authenticateToken,
    cSpaces.getSpaces
);

/**
 * @openapi
 * /api/spaces/location/{id}:
 *   get:
 *     tags:
 *       - Spaces
 *     summary: Retrieve spaces by location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Location ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of spaces in the location.
 */
routes.get(
    "/api/spaces/location/:id",
    auth.authenticateToken,
    validate(idParamSchema, "params"),
    cSpaces.getSpacesperLocation
);

/**
 * @openapi
 * /api/spaces/type/{id}:
 *   get:
 *     tags:
 *       - Spaces
 *     summary: Retrieve spaces by type
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
routes.get(
    "/api/spaces/type/:id",
    auth.authenticateToken,
    validate(idParamSchema, "params"),
    cSpaces.getSpacesperType
);

/**
 * @openapi
 * /api/spaces/capacity/{id}:
 *   get:
 *     tags:
 *       - Spaces
 *     summary: Retrieve spaces by capacity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Minimum capacity
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
routes.get(
    "/api/spaces/capacity/:id",
    auth.authenticateToken,
    validate(idParamSchema, "params"),
    cSpaces.getSpacesCapacity
);

/**
 * @openapi
 * /api/spaces/availability:
 *   get:
 *     tags:
 *       - Spaces
 *     summary: Check space availability
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - timeDate
 *               - timeFrom
 *               - until
 *             properties:
 *               timeDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-30"
 *               timeFrom:
 *                 type: string
 *                 example: "16:00:00"
 *               until:
 *                 type: string
 *                 example: "18:00:00"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Available spaces
 */
routes.get(
    "/api/spaces/availability",
    auth.authenticateToken,
    validate(getSpaceAvailableSchema, "body"),
    cSpaces.getSpaceAvailable
);

/**
 * @openapi
 * /api/spaces/{id}:
 *   get:
 *     tags:
 *       - Spaces
 *     summary: Get space by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
routes.get(
    "/api/spaces/:id",
    auth.authenticateToken,
    validate(idParamSchema, "params"),
    cSpaces.getSpace
);

export default routes;