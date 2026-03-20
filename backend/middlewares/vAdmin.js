import mAuth from "../models/mAuth.js";
import validateData from "../services/validateData.js";
import error from "./error.js";
const vAdmin = {
    validateData: async (request, response, next) => {
        try {
            const { membershipType_id, name, lastname, mail, password, age } = request.body;
            if (!name || !lastname || !age || !mail || !password || !membershipType_id)
                return error.e400(request, response, {
                    message: "Valores Incompletos por favor enviar todos los valores para agregar al Paciente."
                });
            if (validateData.validateNumber(age))
                return error.e400(request, response, {
                    message: `Valores Incompatibles edad:${age}, por favor ingrese un tipo de dato valido en su edad.`
                });
            if (validateData.validateEmail(mail))
                return error.e400(request, response, {
                    message: `Valores Incompatibles mail:${mail}, por favor ingrese un tipo de dato valido en su mail.`
                });
            if (validateData.validateName(name))
                return error.e400(request, response, {
                    message: `Valores Incompatible Nombre:${name}, por favor ingrese un tipo de dato valido en su Nombre.`
                });
            if (validateData.validateName(lastname))
                return error.e400(request, response, {
                    message: `Valores Incompatibles Apellido:${lastname}, por favor ingrese un tipo de dato valido en su Apellido.`
                });
            if (validateData.validateNumber(membershipType_id) || membershipType_id >= 4)
                return error.e400(request, response, {
                    message: `Valores Incompatibles Id de Menbresia: ${membershipType_id}, por favor ingrese un tipo de dato valido en su Id de Menbresia.`
                });
            if (validateData.validatePass(password))
                return error.e400(request, response, {
                    message: `Valores Incompatibles Contrasenia:${password}, por favor ingrese un tipo de dato valido en su Contrasenia.`
                });
            const user = await mAuth.getUser(mail);
            console.log(user);
            if (user.length === 1)
                return error.e409(request, response, {
                    title: "Conflicto",
                    message: "El usuario ya existe en el sistema NO se puede Crear, por favor ingrese un mail y Datos validos."
                });
            next();
        }
        catch (err) {
            return error.e500(request, response, err);
        }
    }
};
export default vAdmin;
//# sourceMappingURL=vAdmin.js.map