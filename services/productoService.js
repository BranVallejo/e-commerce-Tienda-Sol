import { NotFoundError } from "../middleware/appError.js";
import { ProductoModel } from "../schemasDB/productoSchema.js";

export class ProductoService {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
    this.productoSchema = ProductoModel;
  }

  async crearProducto(prod) {
    const producto = new this.productoSchema(prod);
    return await producto.save();
  }

  async obtenerProducto(id) {
    const producto = await this.productoSchema.findById(id);

    if (!producto) throw new NotFoundError(`${id}`);
    return producto;
  }

  async listarProductos() {
    return await this.productoSchema.find();
  }

  async actualizar(id, productoActualizado) {
    const productoGuardado = await this.productoSchema.findByIdAndUpdate(
      id,
      productoActualizado
    );

    if (!productoGuardado) throw new NotFoundError(`${id}`);

    return productoGuardado;
  }

  async eliminarProducto(id) {
    const prod = await this.productoSchema.deleteOne(id);
    if (!prod) throw new NotFoundError(`${id}`);
  }

  async actualizarStock(id, cantidadComprada) {
    const unProducto = await this.productoSchema.findById(id);
    if (!unProducto) throw new Error("Producto no encontrado");

    // Reducir stock
    unProducto.reducirStock(cantidadComprada);

    // Guardar los cambios
    return await unProducto.save();
  }
}

/*


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
*/
