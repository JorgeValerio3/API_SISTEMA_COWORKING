import type { Request, Response, NextFunction } from "express";
declare const vSpaces: {
    validateId: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    validateAvailability: (request: Request, response: Response, next: NextFunction) => Promise<void>;
};
export default vSpaces;
//# sourceMappingURL=vSpaces.d.ts.map