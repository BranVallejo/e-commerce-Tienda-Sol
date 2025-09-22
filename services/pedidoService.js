import {EstadoPedido} from "../models/entities/pedido/estadoPedido.js";

export class PedidoService {
    constructor(pedidoRepo, productoRepo) {
        this.pedidoRepo = pedidoRepo;
        this.productoRepo = productoRepo;
    }

    async getPrecioUnitario(productoID) {
        return await this.productoRepo.findById(productoID).precio;
    }

    async hayStockProducto(id, cantidad) {
        const unProducto = await this.productoRepo.findById(id);
        if (unProducto === null) {
            throw new Error(`El producto de id ${id} no existe como producto`);
        }

        if (unProducto.stock < cantidad) {
            throw new Error(
                `El producto ${unProducto.getTitulo()} tiene un stock inferior, ${unProducto.getStock()}, a la cantidad solicitada, ${cantidad}`
            );
        }
        return true;
    }

    async hayStockTodosProductos(pedido) {
        // .every() no espera a las promesas hay que utilizar Promise.all
        /*return pedido.getItemsPedido().every(
              (item) =>
              this.hayStockProducto(item.producto, item.cantidad)
        );*/

        const resultados = await Promise.all(
            pedido.getItemsPedido().map(
                (item) => this.hayStockProducto(item.productoID, item.cantidad)
            )
        );
        return resultados.every(r => r);
    }

    async actualizarStock(id_producto, cantidad_comprada) {
        const unProducto = await this.productoRepo.findById(id_producto);
        const nuevoStock = unProducto.stock - cantidad_comprada;
        unProducto.setStock(nuevoStock);
        await this.productoRepo.actualizar(id_producto, unProducto);
    }

    //Foreach no espera a las promesas
    async actualizarStockProductos(pedido) {
        for (const item of pedido.getItemsPedido()) {
            await this.actualizarStock(item.productoID, item.cantidad);
        }
    }

    async crearPedido(pedido) {
        if (!await this.hayStockTodosProductos(pedido)) {
            //TODO:revisar los errores cuando no hay stock
            return;
        }

        await this.actualizarStockProductos(pedido);

        return await this.pedidoRepo.create(pedido);
    }

    listarPedidos() {
        return this.pedidoRepo.getPedidos();
    }

    obtenerPedido(idPedido) {
        const pedido = this.pedidoRepo.findById(idPedido);
        return pedido;
    }

    puedeCancelarPedido(pedido) {
        const estadosPermitidos = [
            EstadoPedido.PENDIENTE,
            EstadoPedido.CONFIRMADO,
            EstadoPedido.EN_PREPARACION
        ];
        return estadosPermitidos.includes(pedido.getEstado());
    }

    cancelarPedido(pedido) {
        pedido.cambiarEstado(EstadoPedido.CANCELADO);
    }

    async puedeEnviarPedido(pedido) {

        const items = pedido.getItemsPedido() || [];

        const estadosPermitidos = [
            EstadoPedido.PENDIENTE,
            EstadoPedido.CONFIRMADO,
            EstadoPedido.EN_PREPARACION
        ];

        const productos = await Promise.all(
            items.map((item) => this.productoRepo.findById(item.getProducto()))
        );

        return (
            items.length > 0 &&
            !productos.some((p) => !p) &&
            estadosPermitidos.includes(pedido.getEstado()) &&
            productos.every((p) => p.getVendedorID() === productos[0].getVendedorID())
        );
    }

    enviarPedido(pedido) {
        pedido.cambiarEstado(EstadoPedido.ENVIADO);
    }
}
