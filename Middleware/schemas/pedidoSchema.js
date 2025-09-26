import {z} from "zod";

const MonedaEnum = z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]); // enum de monedas
export const estadoSchema = z.enum(["PENDIENTE", "CONFIRMADO", "EN_PREPARACION", "ENVIADO", "ENTREGADO", "CANCELADO"]);

const direccionEntregaSchema = z.object({
    calle: z.string(),
    altura: z.string(),
    piso: z.string().optional(), // puede ser opcional
    departamento: z.string().optional(), // puede ser opcional
    codigoPostal: z.string(),
    ciudad: z.string(),
    provincia: z.string(),
    pais: z.string().default("Argentina"),
    lat: z.string().optional(),
    lng: z.string().optional(),
});

const itemPedido = z.object({
    producto: z.number().int().nonnegative(),
    cantidad: z.number().int().nonnegative(),
    precioUnitario: z.number().nonnegative().optional()
});

export const pedidoSchema = z.object({
    comprador: z.number().int().nonnegative(),
    items: z.array(itemPedido),
    moneda: MonedaEnum.default("PESO_ARG"),
    direccionEntrega: direccionEntregaSchema,
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