export class ProductoRepository {
    constructor() {
        this.productos = [];
        this.id = 1;
    }

    create(prod) {
        prod.setId(this.id);
        this.id++;
        this.productos.push(prod);
        return Promise.resolve(prod);
    }

    findById(id) {
        const producto = this.productos.find(
            (unProducto) => unProducto.getId() === id
        );
        return Promise.resolve(producto);
    }

    findAll() {
        return Promise.resolve(this.productos);
    }

    delete(id) {
        const indice = this.productos.findIndex(
            (unProducto) => unProducto.getId() === id
        );
        if (indice === -1) return false;

        this.productos.splice(indice, 1);
        return true;
    }

    async actualizar(id, productoActualizado) {
        const indice = this.productos.findIndex((prod) => prod.getId() === id);
        if (indice === -1) return null;
        this.productos[indice] = productoActualizado;

        return productoActualizado;
    }

    buscarPorCategoria(categorias) {
        return this.productos.filter(
            (unProducto) => unProducto.getCategorias() == categorias
        );
    }

    /*
  actualizarStock(id_item, cantidad_comprada){
    const unProducto = this.findById(id_item);

    unProducto.setStock(unProducto.getStock() - cantidad_comprada);
  }*/

}


