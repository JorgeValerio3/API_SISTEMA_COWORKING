import type { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    user_id: number;
    role_id: number;
    membershipType_id: number;
    dateCreate: Date;
    name: string;
    lastname: string;
    mail: string;
    password?: string;
    age: number;
}
