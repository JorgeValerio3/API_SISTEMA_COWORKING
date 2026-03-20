import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    membershipType_id: z.ZodNumber;
    name: z.ZodString;
    lastname: z.ZodString;
    mail: z.ZodString;
    pass: z.ZodString;
    age: z.ZodNumber;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    mail: z.ZodString;
    pass: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map