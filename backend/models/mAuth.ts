import db from "../config/db.js";
import type { User } from "../types/user.types.js";
import type { ResultSetHeader } from "mysql2";

const mAuth = {
    getUser: async (mail: string): Promise<User[]> => {
        try {
            const [results] = await db.query<User[]>(`SELECT * FROM Users WHERE mail = ?`, [mail]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    createUser: async (data: any) => {
        try {
            const { membershipType_id, name, lastname, mail, pass, age } = data;
            const [results] = await db.query<ResultSetHeader>("INSERT INTO Users (role_id, membershipType_id, dateCreate, name, lastname, mail, password, age) VALUES (1, ?, NOW(), ?, ?, ?, ?, ?)", [membershipType_id, name, lastname, mail, pass, age]);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
export default mAuth;