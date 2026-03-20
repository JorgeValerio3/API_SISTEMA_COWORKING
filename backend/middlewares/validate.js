import { ZodError } from "zod";
/**
 * Middleware genérico de validación con Zod.
 * Reemplaza todos los middlewares de validación manual (vBookings, vAuth, vSpaces, vAdmin).
 *
 * @param schema - Schema Zod a validar
 * @param source - Fuente de datos a validar: 'body', 'params', o 'query'
 */
export const validate = (schema, source = "body") => (req, res, next) => {
    try {
        const parsed = schema.parse(req[source]);
        // Sobrescribir con datos parseados y transformados
        req[source] = parsed;
        next();
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                error: true,
                title: "Error 400: Validación Fallida",
                details: err.issues.map((issue) => ({
                    campo: issue.path.join("."),
                    mensaje: issue.message
                })),
            });
        }
        next(err);
    }
};
//# sourceMappingURL=validate.js.map