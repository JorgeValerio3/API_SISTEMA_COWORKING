import type { Request, Response } from "express";
declare const error: {
    e400: (request: Request, response: Response, err: unknown) => void;
    e401: (request: Request, response: Response, err: unknown) => void;
    e403: (request: Request, response: Response, err: unknown) => void;
    e404: (request: Request, response: Response, err?: unknown) => void;
    e409: (request: Request, response: Response, err: unknown) => void;
    e500: (request: Request, response: Response, err: unknown) => void;
    e502: (request: Request, response: Response, err: unknown) => void;
    e503: (request: Request, response: Response, err: unknown) => void;
    e504: (request: Request, response: Response, err: unknown) => void;
};
export default error;
//# sourceMappingURL=error.d.ts.map