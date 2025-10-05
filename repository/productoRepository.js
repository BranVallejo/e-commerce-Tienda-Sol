export class ProductoRepository {
  constructor() {
    //this.model = ProductoModel;
  }
  /*
    async create(usuarioData) {
    const usuario = new this.model(usuarioData);
    return await usuario.save();
    }

    async findUserByID(id) {
       return await this.model.findById(id);
    }
    */

  async create(prod) {
    const producto = new this.model(prod);
    return await producto.save();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findAll() {
    return;
  }

  findAll() {
    return Promise.resolve(this.productos);
  }

  update(id, productoActualizado) {
    const indice = this.productos.findIndex((prod) => prod.getId() == id);

    if (indice === -1) return Promise.resolve(null);

    this.productos[indice] = productoActualizado;
    return Promise.resolve(productoActualizado);
  }

  delete(id) {
    const indice = this.productos.findIndex(
      (unProducto) => unProducto.getId() === id
    );
    if (indice === -1) return false;

    this.productos.splice(indice, 1);
    return true;
  }
}
