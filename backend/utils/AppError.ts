/**
 * Error de aplicación con código HTTP.
 * Usado para lanzar errores controlados dentro de servicios/transacciones.
 */
export class AppError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
