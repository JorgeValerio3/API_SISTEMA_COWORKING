import validateData from "../services/validateData.js";
import error from "./error.js";
const vBookings = {
    validateId: async (request, response, next) => {
        try {
            const id = request.params.id;
            if (!id)
                return error.e400(request, response, {
                    message: "Valores Incompletos por favor enviar todos los valores para realizar la busqueda."
                });
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
    validateCreateBooking: async (request, response, next) => {
        try {
            const { spaces_id, timeDate, timeFrom, until } = request.body;
            if (!timeDate || !timeFrom || !until || !spaces_id)
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
            if (validateData.validateNumber(spaces_id))
                return error.e400(request, response, {
                    message: `Valores Incompatibles, until: ${spaces_id} no es un valor valido por favor ingrese un tipo de dato valido en formato Numerico en el spaces_id.`
                });
            if (new Date(`${timeDate}T${timeFrom}`) <= new Date(`${timeDate}T08:00:00`))
                return error.e400(request, response, {
                    message: "El campo 'timeDate' esta fuera de rango, no puedes hacer reservacion antes de las 8:00AM"
                });
            if (new Date(`${timeDate}T${until}`) >= new Date(`${timeDate}T21:00:00`))
                return error.e400(request, response, {
                    message: "El campo 'timeDate' esta fuera de rango, no puedes hacer reservacion despues de las 9:00PM"
                });
            if (new Date(`${timeDate}T${until}`) <= new Date(`${timeDate}T${timeFrom}`))
                return error.e400(request, response, {
                    message: "El campo 'until' debe ser mayor que 'timeFrom'"
                });
            next();
        }
        catch (err) {
            return error.e500(request, response, err);
        }
    },
    validateExtendBooking: async (request, response, next) => {
        try {
            const { until } = request.body;
            if (!until)
                return error.e400(request, response, {
                    message: "Valores Incompletos por favor enviar todos los valores para Realizar la Consulta."
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
export default vBookings;
//# sourceMappingURL=vBookings.js.map