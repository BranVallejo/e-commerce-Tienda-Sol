import { EstadoPedido } from "../models/entities/pedido/estadoPedido.js";

export class PedidoService {
  constructor(pedidoRepo, productoRepo) {
    this.pedidoRepo = pedidoRepo;
    this.productoRepo = productoRepo;
  }

  getPrecioUnitario(productoID) {
      return this.productoRepo.findById(productoID).precio;
  }

  crearPedido(pedido) {
    if (!this.hayStockTodosProductos(pedido)) {
      //TODO:revisar los errores cuando no hay stock
      return;
    }

    this.actualizarStockProductos(pedido);

    return this.pedidoRepo.create(pedido);
  }

  listarPedidos() {
    return this.pedidoRepo.getPedidos();
  }

  hayStockTodosProductos(pedido) {
    return pedido
      .getItems()
      .every((item) =>
        this.hayStockProducto(item.producto, item.cantidad)
      );
  }

  actualizarStockProductos(pedido) {
    pedido
      .getItems()
      .forEach((item) =>
        this.productoRepo.actualizarStock(item.producto, item.cantidad)
      );
  }

    hayStockProducto(id, cantidad) {
        const unProducto = this.productoRepo.findById(id);
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

    cancelarPedido(pedido){
    pedido.cambiarEstado(EstadoPedido.CANCELADO);
  }

  puedeEnviarPedido(pedido) {

      const items = pedido.getItems() || [];

      const estadosPermitidos = [
          EstadoPedido.PENDIENTE,
          EstadoPedido.CONFIRMADO,
          EstadoPedido.EN_PREPARACION
      ];

      const productos = items.map((item) => this.productoRepo.findById(item.getProducto()));

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
