import { Router } from "express";
import cAuth from "../controllers/cAuth.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import auth from "../middlewares/auth.js";
const routes = Router();
/* METHOD: POST: Register */
routes.post("/api/auth/register", validate(registerSchema, "body"), cAuth.createUser);
/* METHOD: POST: Login */
routes.post("/api/auth/login", validate(loginSchema, "body"), cAuth.loginUser);
/* METHOD POST: Logout */
routes.post("/api/auth/logout", auth.authenticateToken, cAuth.logoutUser);
export default routes;
//# sourceMappingURL=rAuth.js.map