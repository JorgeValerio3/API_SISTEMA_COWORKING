import db from "../config/db.js";
const mAuth = {
    getUser: async (mail) => {
        try {
            const [results] = await db.query(`SELECT * FROM Users WHERE mail = ?`, [mail]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    createUser: async (data) => {
        try {
            const { membershipType_id, name, lastname, mail, pass, age } = data;
            const [results] = await db.query("INSERT INTO Users (role_id, membershipType_id, dateCreate, name, lastname, mail, password, age) VALUES (1, ?, NOW(), ?, ?, ?, ?, ?)", [membershipType_id, name, lastname, mail, pass, age]);
            return results;
        }
        catch (err) {
            throw err;
        }
    }
};
export default mAuth;
//# sourceMappingURL=mAuth.js.map