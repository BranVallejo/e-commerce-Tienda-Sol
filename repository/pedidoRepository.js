import { PedidoModel } from "../schemasDB/pedidoSchema.js";

export class PedidoRepository {
  constructor() {
    this.pedidoSchema = PedidoModel;
  }

  /*
  create(pedido) {
    pedido.setId(this.id);
    this.id++;
    this.pedidos.push(pedido);
    return Promise.resolve(pedido);
  }*/

  async create(prod) {
    const producto = new this.pedidoSchema(prod);
    return await producto.save();
  }

  /*
  findById(id) {
    const pedido = this.pedidos.find((unPedido) => unPedido.getId() === id);
    return Promise.resolve(pedido ?? null);
  }*/

  async findById(id) {
    const pedido = await this.pedidoSchema.findById(id);

    if (!pedido) throw new NotFoundError(`${id}`);

    return pedido;
  }

  async findAll(page, documentosXpagina) {
    const skip = (page - 1) * documentosXpagina;

    return await this.pedidoSchema
      .find()
      .limit(documentosXpagina)
      .skip(skip)
      .toArray();
  }

  delete(id) {
    const pedidoEliminado = this.pedidoSchema.findByIdAndDelete(id);
    if (!pedidoEliminado) return null;

    return pedidoEliminado;
  }

  actualizar(id, pedidoActualizado) {
    if (pedidoActualizado == null) return Promise.resolve(null);

    const indice = this.obtenerIndicePorID(id);

    if (indice === -1) return Promise.resolve(null);

    this.pedidos[indice] = pedidoActualizado;

    return Promise.resolve(pedidoActualizado);
  }

  obtenerIndicePorID(id) {
    return this.pedidos.findIndex((pedido) => pedido.getId() === id);
  }

  historialPedidos(compradorID) {
    return Promise.resolve(
      this.pedidos.filter((pedido) => pedido.getCompradorID() == compradorID)
    );
  }
}
