import { Router } from "express";
import cAuth from "../controllers/cAuth.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import auth from "../middlewares/auth.js";

const routes = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - membershipType_id
 *               - name
 *               - lastname
 *               - mail
 *               - pass
 *               - age
 *             properties:
 *               membershipType_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               mail:
 *                 type: string
 *               pass:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
routes.post(
    "/api/auth/register",
    validate(registerSchema, "body"),
    cAuth.createUser
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mail
 *               - pass
 *             properties:
 *               mail:
 *                 type: string
 *                 format: email
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
routes.post(
    "/api/auth/login",
    validate(loginSchema, "body"),
    cAuth.loginUser
);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
routes.post(
    "/api/auth/logout",
    auth.authenticateToken,
    cAuth.logoutUser
);

export default routes;