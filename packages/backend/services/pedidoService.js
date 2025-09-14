
export class PedidoService {
  constructor(pedidoRepo, productoRepo) {
    this.pedidoRepo = pedidoRepo;
    this.productoRepo = productoRepo;
  }

  crearPedido(pedido) {
    
    if(!this.hayStockTodosProductos(pedido)){
      return 
    }

    this.actualizarStockProductos(pedido);

    return this.pedidoRepo.create(pedido);
  }

  listarPedidos() {
    return this.pedidoRepo.findAll();
  }

  hayStockTodosProductos(pedido){
    return pedido.getItems().every((item) =>
        this.productoRepo.hayStockProducto(item.producto, item.cantidad)
      );
  }

  actualizarStockProductos(pedido){

    pedido.getItems().forEach( item => this.productoRepo.actualizarStock(item.producto,item.cantidad));
  
  }

  obtenerPedido(idPedido){
    const pedido = this.pedidoRepo.findById(idPedido);
    return pedido;
  }
}