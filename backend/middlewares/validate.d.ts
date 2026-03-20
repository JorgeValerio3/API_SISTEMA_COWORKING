import type { Request, Response, NextFunction } from "express";
import { type ZodSchema } from "zod";
/**
 * Middleware genérico de validación con Zod.
 * Reemplaza todos los middlewares de validación manual (vBookings, vAuth, vSpaces, vAdmin).
 *
 * @param schema - Schema Zod a validar
 * @param source - Fuente de datos a validar: 'body', 'params', o 'query'
 */
export declare const validate: (schema: ZodSchema, source?: "body" | "params" | "query") => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.d.ts.map