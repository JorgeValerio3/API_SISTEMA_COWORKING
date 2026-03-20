import type { User } from "../types/user.types.js";
import type { ResultSetHeader } from "mysql2";
declare const mAuth: {
    getUser: (mail: string) => Promise<User[]>;
    createUser: (data: any) => Promise<ResultSetHeader>;
};
export default mAuth;
//# sourceMappingURL=mAuth.d.ts.map