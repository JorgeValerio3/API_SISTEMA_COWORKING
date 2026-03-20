import type { Request } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        mail: string;
        role_id?: number;
        iat?: number;
        exp?: number;
    };
}
//# sourceMappingURL=express.types.d.ts.map