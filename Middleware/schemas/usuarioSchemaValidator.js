import {z} from "zod";
import {Usuario} from "../../models/entities/usuario/usuario.js";


export const usuarioSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Formato de email inválido"),
    telefono: z.string().min(6, "El teléfono debe tener al menos 6 dígitos"),
    tipo: z.enum(["COMPRADOR", "VENDEDOR", "ADMIN"]), // podés ajustar según tus tipos
});

export const parsearUsuario = (req) => {

    const result = usuarioSchema.safeParse(req.body);

    if (result.error) {
        throw result.error;
    }

    return new Usuario(
        result.data.nombre,
        result.data.email,
        result.data.telefono,
        result.data.tipo
    );
}

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

