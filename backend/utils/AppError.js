/**
 * Error de aplicación con código HTTP.
 * Usado para lanzar errores controlados dentro de servicios/transacciones.
 */
export class AppError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
//# sourceMappingURL=AppError.js.map