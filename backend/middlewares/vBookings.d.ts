import type { Request, Response, NextFunction } from "express";
declare const vBookings: {
    validateId: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    validateCreateBooking: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    validateExtendBooking: (request: Request, response: Response, next: NextFunction) => Promise<void>;
};
export default vBookings;
//# sourceMappingURL=vBookings.d.ts.map