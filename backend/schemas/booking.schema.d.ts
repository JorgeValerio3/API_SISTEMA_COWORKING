import { z } from "zod";
export declare const createBookingSchema: z.ZodObject<{
    spaces_id: z.ZodNumber;
    timeDate: z.ZodString;
    timeFrom: z.ZodString;
    until: z.ZodString;
    numberPersons: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const extendBookingSchema: z.ZodObject<{
    until: z.ZodString;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
//# sourceMappingURL=booking.schema.d.ts.map