const getErrorMessage = (err) => {
    if (err && typeof err === "object" && "message" in err) {
        return err.message;
    }
    return "Error desconocido";
};
const error = {
    e400: (request, response, err) => {
        response.status(400).json({
            error: true,
            title: "Error 400: Bad Request",
            message: getErrorMessage(err)
        });
    },
    e401: (request, response, err) => {
        response.status(401).json({
            error: true,
            title: "Error 401: Authorization Required",
            message: getErrorMessage(err)
        });
    },
    e403: (request, response, err) => {
        response.status(403).json({
            error: true,
            title: "Error 403: Forbidden",
            message: getErrorMessage(err)
        });
    },
    e404: (request, response, err) => {
        response.status(404).json({
            error: true,
            title: "Error 404: Not Found",
            message: err ? getErrorMessage(err) : "Recurso no encontrado"
        });
    },
    e409: (request, response, err) => {
        response.status(409).json({
            error: true,
            title: "Error 409: Conflict",
            message: getErrorMessage(err)
        });
    },
    e500: (request, response, err) => {
        console.error("SERVER ERROR:", err);
        // Never expose stack traces to the client
        const message = process.env.NODE_ENV === "production"
            ? "Error interno del servidor"
            : getErrorMessage(err);
        response.status(500).json({
            error: true,
            title: "Error 500: Internal Server",
            message
        });
    },
    e502: (request, response, err) => {
        response.status(502).json({
            error: true,
            title: "Error 502: Bad Gateway",
            message: getErrorMessage(err)
        });
    },
    e503: (request, response, err) => {
        response.status(503).json({
            error: true,
            title: "Error 503: Service Unavailable",
            message: getErrorMessage(err)
        });
    },
    e504: (request, response, err) => {
        response.status(504).json({
            error: true,
            title: "Error 504: Gateway Timeout",
            message: getErrorMessage(err)
        });
    }
};
export default error;
//# sourceMappingURL=error.js.map