import type { Request, Response } from "express";
declare const cSpaces: {
    getSpaces: (request: Request, response: Response) => Promise<void>;
    getSpace: (request: Request, response: Response) => Promise<void>;
    getSpacesperType: (request: Request, response: Response) => Promise<void>;
    getSpacesCapacity: (request: Request, response: Response) => Promise<void>;
    getSpacesperLocation: (request: Request, response: Response) => Promise<void>;
    getSpaceAvailable: (request: Request, response: Response) => Promise<void>;
};
export default cSpaces;
//# sourceMappingURL=cSpaces.d.ts.map