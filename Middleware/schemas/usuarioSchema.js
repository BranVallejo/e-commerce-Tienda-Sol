import {z} from "zod";

export const usuarioSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Formato de email inválido"),
    telefono: z.string().min(6, "El teléfono debe tener al menos 6 dígitos"),
    tipo: z.enum(["COMPRADOR", "VENDEDOR", "ADMIN"]), // podés ajustar según tus tipos
});

/**/
export const idTransform = z.string().transform((val, ctx) => {
    const num = Number(val);
    if (isNaN(num)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "id must be a number",
        });
        return z.NEVER;
    }
    return num;
});