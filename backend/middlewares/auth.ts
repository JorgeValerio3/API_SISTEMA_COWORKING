import jwt from "jsonwebtoken";
import error from "./error.js";
import { SECRET } from "../config/config.js";
import type { Request, Response, NextFunction } from "express";

const auth = {
    authenticateToken: (request: Request, response: Response, next: NextFunction) => {
        try {
            const authHeader = request.headers["auth"];
            const tokenFromHeader = authHeader && (authHeader as string).split(" ")[1];
            const tokenFromCookie = request.cookies?.token;
            const token = tokenFromCookie || tokenFromHeader;
            if (!token) return error.e401(request, response, {
                title: "Token no Provisto",
                message: "Error al Autenticar no se a encontrado el Token",
            });
            jwt.verify(token, SECRET, (err: any, user: any) => {
                if (err) return error.e401(request, response, {
                    title: "Token Invalido o Expirado",
                    message: "Error al Autenticar Token Invalido o Expirado",
                });
                //este es el payload en el request
                request.user = user;
                next();
            })
        } catch (err) {
            error.e500(request, response, err);
        }
    },
    authorizeRoles: (...allowedRoles: string[]) => {
        return (request: Request, response: Response, next: NextFunction) => {
            try {
                if (!request.user) return error.e401(request, response, {
                    title: "No autorizado",
                    message: "No tienes permisos para acceder a este recurso",
                });
                if (!allowedRoles.includes((request.user as any).role)) return error.e403(request, response, {
                    title: "Acceso denegado",
                    message: "No tienes permisos para acceder a este recurso",
                });
                next();
            } catch (err) {
                error.e500(request, response, err);
            }
        }
    }
}

export default auth;