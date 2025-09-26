import {z} from "zod";
import {Categoria} from "../../models/entities/producto/categoria.js";

export const productoSchema = z.object({
    // id: z.number(),
    titulo: z.string(),
    descripcion: z.string().default(""),
    precio: z.number().nonnegative(),
    moneda: z.string().default("ARS"),
    stock: z.number().int().nonnegative(),
    fotos: z.array(z.string()).default([]),
    activo: z.boolean().default(true),
    categorias: z.array(z.object({nombre: z.string()}))
        .transform(cats => cats.map(cat => new Categoria(cat.nombre))),
    vendedor: z.number().int().nonnegative(),
    createdAt: z.preprocess(arg => {
        if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date()).default(() => new Date()),
    updatedAt: z.preprocess(arg => {
        if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date()).default(() => new Date()),
});


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