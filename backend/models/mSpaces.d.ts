import type { SpaceRow } from "../types/spaces.types.js";
declare const mSpaces: {
    getSpaces: () => Promise<SpaceRow[]>;
    getSpace: (id: number) => Promise<SpaceRow[]>;
    getSpacesperType: (id: number) => Promise<SpaceRow[]>;
    getSpacesCapacity: (capacity: number) => Promise<SpaceRow[]>;
    getSpacesperLocation: (id: number) => Promise<SpaceRow[]>;
    getSpaceAvailable: (data: {
        timeDate: string;
        timeFrom: string;
        until: string;
    }) => Promise<SpaceRow[]>;
};
export default mSpaces;
//# sourceMappingURL=mSpaces.d.ts.map