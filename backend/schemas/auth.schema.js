import { z } from "zod";
export const registerSchema = z.object({
    membershipType_id: z.number().int().min(1).max(3, "membershipType_id debe estar entre 1 y 3"),
    name: z.string().regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/, "name debe contener solo letras y tener entre 2 y 50 caracteres"),
    lastname: z.string().regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/, "lastname debe contener solo letras y tener entre 2 y 50 caracteres"),
    mail: z.string().email("mail debe ser un correo electrónico válido"),
    pass: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/, "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"),
    age: z.number().int().min(18, "Debe ser mayor de 18 años").max(120),
});
export const loginSchema = z.object({
    mail: z.string().email("mail debe ser un correo electrónico válido"),
    pass: z.string().min(1, "pass es requerido"),
});
//# sourceMappingURL=auth.schema.js.map