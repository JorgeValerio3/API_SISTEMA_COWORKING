import jwt from "jsonwebtoken";
import error from "./error.js";
import { SECRET } from "../config/config.js";
const auth = {
    authenticateToken: (request, response, next) => {
        try {
            const authHeader = request.headers["auth"];
            const tokenFromHeader = authHeader && authHeader.split(" ")[1];
            const tokenFromCookie = request.cookies?.token;
            const token = tokenFromCookie || tokenFromHeader;
            if (!token)
                return error.e401(request, response, {
                    title: "Token no Provisto",
                    message: "Error al Autenticar no se a encontrado el Token",
                });
            jwt.verify(token, SECRET, (err, user) => {
                if (err)
                    return error.e401(request, response, {
                        title: "Token Invalido o Expirado",
                        message: "Error al Autenticar Token Invalido o Expirado",
                    });
                //este es el payload en el request
                request.user = user;
                next();
            });
        }
        catch (err) {
            error.e500(request, response, err);
        }
    },
    authorizeRoles: (...allowedRoles) => {
        return (request, response, next) => {
            try {
                if (!request.user)
                    return error.e401(request, response, {
                        title: "No autorizado",
                        message: "No tienes permisos para acceder a este recurso",
                    });
                if (!allowedRoles.includes(request.user.role))
                    return error.e403(request, response, {
                        title: "Acceso denegado",
                        message: "No tienes permisos para acceder a este recurso",
                    });
                next();
            }
            catch (err) {
                error.e500(request, response, err);
            }
        };
    }
};
export default auth;
//# sourceMappingURL=auth.js.map