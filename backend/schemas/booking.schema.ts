import { z } from "zod";

export const createBookingSchema = z.object({
    spaces_id: z.number().int().positive({ message: "spaces_id debe ser un número positivo" }),
    timeDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "timeDate debe tener formato YYYY-MM-DD"),
    timeFrom: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "timeFrom debe tener formato HH:MM:SS"),
    until: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "until debe tener formato HH:MM:SS"),
    numberPersons: z.number().int().positive().optional().default(1),
}).refine(
    data => new Date(`${data.timeDate}T${data.until}`) > new Date(`${data.timeDate}T${data.timeFrom}`),
    { message: "'until' debe ser posterior a 'timeFrom'", path: ["until"] }
).refine(
    data => data.timeFrom >= "08:00:00",
    { message: "No se puede reservar antes de las 08:00 AM", path: ["timeFrom"] }
).refine(
    data => data.until <= "21:00:00",
    { message: "No se puede reservar después de las 09:00 PM", path: ["until"] }
);

export const extendBookingSchema = z.object({
    until: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "until debe tener formato HH:MM:SS"),
});

export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "El ID debe ser un número válido").transform(Number),
});
