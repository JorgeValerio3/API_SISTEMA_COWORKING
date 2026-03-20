import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import error from "../middlewares/error.js";
import mAuth from "../models/mAuth.js";
import { EXPIRES, SECRET } from "../config/config.js";
import type { Request, Response } from "express";
import type { User } from "../types/user.types.js";

const cAuth = {
    createUser: async (request: Request, response: Response) => {
        try {
            const { membershipType_id, name, lastname, mail, password, age } = request.body;
            let pass = await bcrypt.hash(password, 10);
            const newUser = await mAuth.createUser({ membershipType_id, name, lastname, mail, pass, age });
            response.json({
                message: "Usuario Creado con Exito en la BBDD",
                user: newUser
            });
        } catch (err) {
            error.e500(request, response, err);
        }
    },
    loginUser: async (request: Request, response: Response) => {
        try {
            const { mail, password } = request.body;
            const user: User[] = await mAuth.getUser(mail);
            const foundUser = user[0];
            if (!foundUser) return error.e401(request, response, {
                title: "Credenciales inválidas",
                message: "El usuario no fue encontrado, por favor ingresa un usuario validos."
            })
            const match = await bcrypt.compare(password, foundUser.password as string);
            if (!match) return error.e401(request, response, {
                title: "Credenciales inválidas",
                message: "La contrasena ingresada es invalida, por favor ingrese una contrasena valida."
            })
            const payload = { id: foundUser.user_id, mail };
            const token = jwt.sign(payload, SECRET as jwt.Secret, { expiresIn: EXPIRES as any });
            response.json({
                message: "Login Correcto y mensaje de confirmacion enviado",
                token,
                user
            });
        } catch (err) {
            error.e500(request, response, err);
        }
    },
    logoutUser: async (request: Request, response: Response) => {
        try {
            response.clearCookie("token");
            response.json({
                message: "Sesion Cerrada con Exito"
            })
        } catch (err) {
            error.e500(request, response, err);
        }
    },
}

export default cAuth;