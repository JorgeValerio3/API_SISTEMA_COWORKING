import { z } from "zod";

export const getSpaceAvailableSchema = z.object({
    timeDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "timeDate debe tener formato YYYY-MM-DD"),
    timeFrom: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "timeFrom debe tener formato HH:MM:SS"),
    until: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "until debe tener formato HH:MM:SS"),
});

export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID debe ser un número"),
});
