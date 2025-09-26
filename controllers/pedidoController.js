import {Pedido} from "../models/entities/pedido/pedido.js";
import {ItemPedido} from "../models/entities/pedido/itemPedido.js";
import {pedidoSchema, estadoSchema, idTransform } from "../Middleware/schemas/pedidoSchema.js";


export class PedidoController {
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }

    //#############
    //CREATE pedido
    //#############

    async crearPedido(req, res) {
        const result = pedidoSchema.safeParse(req.body);
        let totalCalculado = 0;

        if (result.error) {
            return res.status(400).json(result.error.issues);
        }

        const itemsInstanciados = await Promise.all(
            result.data.items.map(async (i) => {
                const precioUnitarioActual = await this.pedidoService.getPrecioUnitario(i.producto);
                totalCalculado += precioUnitarioActual * i.cantidad;
                return new ItemPedido(i.producto, i.cantidad, precioUnitarioActual);
            })
        );

        const nuevoPedido = new Pedido(
            result.data.comprador,
            itemsInstanciados,
            totalCalculado,
            result.data.moneda,
            result.data.direccionEntrega
        );

        await this.pedidoService.crearPedido(nuevoPedido);
        return res.status(201).json(nuevoPedido);
    }

    //#############
    //CREATE pedido
    //#############

    //#############
    //RETRIEVE pedido
    //#############

    async listarPedidos(req, res) {
        try {
            const pedidos = await this.pedidoService.listarPedidos(); // devuelve directamente un array o undefined

            if (!pedidos || pedidos.length === 0) {
                return res.status(404).json({error: "No se encontraron pedidos"});
            }

            return res.status(200).json({pedidos});
        } catch (error) {
            // Captura errores inesperados, por ejemplo si la base de datos lanza un error
            return res.status(500).json({error: error.message || "Error interno"});
        }
    }

    async obtenerPedido(req, res) {
        const idResult = idTransform.safeParse(req.params.id);

        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const pedido = await this.pedidoService.obtenerPedido(idResult.data);

        if (!pedido) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no encontrado`,
            });
        }

        return res.status(200).json(pedido);
    }

    //#############
    //RETRIEVE pedido
    //#############

    //#############
    //UPDATE pedido
    //#############

    async actualizarEstado(req, res) {
        const idResult = idTransform.safeParse(req.params.id);
        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const estadoResult = estadoSchema.safeParse(req.body.estado);
        if (estadoResult.error) return res.status(400).json(estadoResult.error.issues);

        const pedidoActualizado = await this.pedidoService.cambiarEstado(idResult.data, estadoResult.data);
        if (!pedidoActualizado) {
            return res.status(400).json({ error: `No se pudo cambiar el estado del pedido` });
        }
        if (pedidoActualizado == -1) {
            return res.status(404).json({ error: `Pedido con id: ${idResult.data} no encontrado` });
        }

        return res.status(200).json({
            mensaje: `Pedido actualizado al estado ${pedidoActualizado.getEstado()} con éxito`,
            pedido: pedidoActualizado
        });
    }

    //#############
    //UPDATE pedido
    //#############

    //#############
    //DELETE pedido
    //#############

    async delete(req, res){
        const idResult = idTransform.safeParse(req.params.id);
        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const pedidoEliminado = await this.pedidoService.delete(idResult.data);
        if (!pedidoEliminado) {
            return res.status(404).json({ error: `Pedido con ID ${idResult.data} no existe` });
        }

        return res.status(200).json({
            mensaje: `Pedido eliminado con éxito`,
            pedido: pedidoEliminado
        });
    }

    //#############
    //DELETE pedido
    //#############

    /*
    async cancelarPedido(req, res) {
        const idResult = idTransform.safeParse(req.params.id);

        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const pedido = await this.pedidoService.obtenerPedido(idResult.data);
        if (!pedido) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no encontrado`
            });
        }

        const pedidoCancelado = await this.pedidoService.cancelarPedido(pedido);

        if (!pedidoCancelado) {
            return res.status(400).json({
                error: `Pedido con id: ${idResult.data} no puede ser cancelado, porque el estado es ${pedido.getEstado()}`
            });
        }

        return res.status(200).json({
                mensaje: "Pedido cancelado con éxito",
                pedido: pedidoCancelado
            }
        );
    }

    async marcarEnviado(req, res) {
        const idResult = idTransform.safeParse(req.params.id);

        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const pedidoObtenido = await this.pedidoService.obtenerPedido(idResult.data);

        if (!pedidoObtenido) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no encontrado`,
            });
        }

        const pedidoEnviado = await this.pedidoService.enviarPedido(pedidoObtenido);
        if (!pedidoEnviado) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no puede ser enviado.`,
            });
        }
        return res
            .status(200)
            .json({
                mensaje: "Pedido marcado como enviado con éxito",
                pedido: pedidoEnviado
            });
    }*/

}
