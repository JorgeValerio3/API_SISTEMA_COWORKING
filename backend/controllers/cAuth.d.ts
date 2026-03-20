import type { Request, Response } from "express";
declare const cAuth: {
    createUser: (request: Request, response: Response) => Promise<void>;
    loginUser: (request: Request, response: Response) => Promise<void>;
    logoutUser: (request: Request, response: Response) => Promise<void>;
};
export default cAuth;
//# sourceMappingURL=cAuth.d.ts.map