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

export const parsearId = (req) => {
    const result= parseInt(req.params.id, 10);
    if (result.error) {
        throw result.error;
    }
    return result;
}