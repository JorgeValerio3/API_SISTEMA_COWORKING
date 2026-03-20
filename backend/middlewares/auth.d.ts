import type { Request, Response, NextFunction } from "express";
declare const auth: {
    authenticateToken: (request: Request, response: Response, next: NextFunction) => void;
    authorizeRoles: (...allowedRoles: string[]) => (request: Request, response: Response, next: NextFunction) => void;
};
export default auth;
//# sourceMappingURL=auth.d.ts.map