

export class PedidoRepository{

    constructor() {
    this.pedidos = [];
    this.id = 1;
  }

  create(pedido) {
    pedido.setId(this.id);
    this.id++;
    this.pedidos.push(pedido);
    return pedido;
  }

  findAll() {
    return Array.from(this.pedidos.values());
  }

}