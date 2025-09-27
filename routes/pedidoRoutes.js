import express from "express";
import {PedidoController} from "../controllers/pedidoController.js";

const pathPedido = "/pedidos";

// Este getController recibe la clase del controller y devuelve la instancia
export default function pedidoRoutes(getController) {
    const router = express.Router();

    // Crear pedido
    router.post(pathPedido, (req, res, next) => {
        getController(PedidoController).crearPedido(req, res, next);
    });

    // Listar todos los pedidos
    router.get(pathPedido, (req, res, next) => {
        getController(PedidoController).listarPedidos(req, res, next);
    });

    // Obtener pedido por ID
    router.get(pathPedido + "/:id", (req, res, next) => {
        getController(PedidoController).obtenerPedido(req, res, next);
    });

    // Eliminar pedido por ID
    router.delete(pathPedido + "/:id", (req, res, next) => {
        getController(PedidoController).eliminarPedido(req, res, next);
    });

    // Cancelar / Enviar pedido en base al ID
    router.patch(pathPedido + "/:id", (req, res, next) => {
        getController(PedidoController).actualizarEstado(req, res, next);
    });


    return router;
}