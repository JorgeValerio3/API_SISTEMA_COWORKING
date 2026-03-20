import type { RowDataPacket } from "mysql2";
export interface SpaceRow extends RowDataPacket {
    spaces_id: number;
    spacesType_id: number;
    spacesType: string;
    location_id: number;
    location: string;
    membershipType_id: number;
    membershipType: string;
    capacity: number;
    priceHour: number;
    priceDay: number;
}
//# sourceMappingURL=spaces.types.d.ts.map