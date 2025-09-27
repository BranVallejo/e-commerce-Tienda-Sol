export class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }

    crearProducto(producto) {
        return this.productoRepository.create(producto);
    }

    eliminarProducto(id) {
        return this.productoRepository.delete(id);
    }

    obtenerProducto(id) {
        return this.productoRepository.findById(id);
    }

    listarProductos() {
        return this.productoRepository.findAll();
    }

    actualizar(id, productoActualizado) {
        const productoGuardado = this.productoRepository.actualizar(id, productoActualizado);
        return productoGuardado;
    }

    buscarPorCategoria(categorias) {
        const productos = this.productoRepository.buscarPorCategoria(categorias);
        if (!productos) {
            throw new Error("No se encontró ningún producto con esas categorías");
        }
        return productos;
    }

    // validarStock(id, cantidad) {
    //   const producto = this.productoRepository.findById(id);
    //   if (!producto) {
    //     throw new Error("Producto no encontrado");
    //   }
    //   return producto.getStock() >= cantidad;
    // }

    // reducirStock(id, cantidad) {
    //   const producto = this.obtenerProducto(id);
    //   producto.reducirStock(cantidad);
    //   return this.productoRepository.update(producto);
    // }

    // aumentarStock(id, cantidad) {
    //   const producto = this.obtenerProducto(id);
    //   producto.aumentarStock(cantidad);
    //   return this.productoRepository.update(producto);
    // }
}
