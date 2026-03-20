import validateData from "../services/validateData.js";
import error from "./error.js";
const vSpaces = {
    validateId: async (request, response, next) => {
        try {
            const id = request.params.id;
            if (!id)
                return error.e400(request, response, {
                    message: "Valores Incompletos por favor enviar todos los valores para realizar la busqueda."
                });
            console.log(id);
            if (validateData.validateNumber(id))
                return error.e400(request, response, {
                    message: `Valores Incompatibles, Id: ${id} no es un valor valido por favor ingrese un tipo de dato valido en el Id.`
                });
            next();
        }
        catch (err) {
            return error.e500(request, response, err);
        }
    },
    validateAvailability: async (request, response, next) => {
        try {
            const { timeDate, timeFrom, until } = request.body;
            if (!timeDate || !timeFrom || !until)
                return error.e400(request, response, {
                    message: "Valores Incompletos por favor enviar todos los valores para Realizar la Consulta."
                });
            if (validateData.validateDate(timeDate))
                return error.e400(request, response, {
                    message: `Valores Incompatibles, timeDate: ${timeDate} no es un valor valido por favor ingrese un tipo de dato valido en formato DATE en el timeDate.`
                });
            if (validateData.validateTime(timeFrom))
                return error.e400(request, response, {
                    message: `Valores Incompatibles, timeFrom: ${timeFrom} no es un valor valido por favor ingrese un tipo de dato valido en formato TIME en el timeFrom.`
                });
            if (validateData.validateTime(until))
                return error.e400(request, response, {
                    message: `Valores Incompatibles, until: ${until} no es un valor valido por favor ingrese un tipo de dato valido en formato TIME en el until.`
                });
            next();
        }
        catch (err) {
            return error.e500(request, response, err);
        }
    }
};
export default vSpaces;
//# sourceMappingURL=vSpaces.js.map