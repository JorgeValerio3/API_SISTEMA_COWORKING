import type { Request, Response, NextFunction } from "express";
declare const vAuth: {
    validateCreateUser: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    validateLoginUser: (request: Request, response: Response, next: NextFunction) => Promise<void>;
};
export default vAuth;
//# sourceMappingURL=vAuth.d.ts.map