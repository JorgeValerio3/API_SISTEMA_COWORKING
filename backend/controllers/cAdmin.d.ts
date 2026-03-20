import type { Response } from "express";
import type { AuthenticatedRequest } from "../types/express.types.js";
declare const cAdmin: {
    getBookings: (request: AuthenticatedRequest, response: Response) => Promise<void>;
    getAllStats: (request: AuthenticatedRequest, response: Response) => Promise<void>;
    extendBooking: (request: AuthenticatedRequest, response: Response) => Promise<void>;
};
export default cAdmin;
//# sourceMappingURL=cAdmin.d.ts.map