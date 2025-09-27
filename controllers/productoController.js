import {Producto} from "../models/entities/producto/producto.js";
import {productoSchema} from "../Middleware/schemas/productoSchema.js";


export class ProductoController {

    constructor(productoService) {
        this.productoService = productoService;
    }

    //#############
    //CREATE producto
    //#############

    crearProducto(req, res, next) {
        const nuevoProducto = productoSchema.parsearProducto(req);
        this.productoService.crearProducto(nuevoProducto)
            .then(producto => { return res.status(201).json(producto) })
            .catch(error => { next(error) });
    }


    //###############
    //RETRIEVE producto
    //###############
    obtenerProducto(req, res, next) {
        const idResult = productoSchema.parsearId(req);
        this.productoService.obtenerProducto(idResult)
            .then(producto => res.status(200).json(producto))
            .catch(error => { next(error) });
    }

    listarProductos(req, res, next) {
        const idResult = productoSchema.parsearId(req);
        this.productoService.listarProductos(idResult)
        .then(productos => res.status(200).json(productos))
        .catch(error => { next(error) });
    }

    buscarPorCategoria(req, res) {

        const unaCategoria = productoSchema.safeParse(req.params.categoria);
        if (unaCategoria.error) return res.status(400).json(unaCategoria.error.issues);
        const productos = this.productoService.buscarPorCategoria(unaCategoria.data.categorias);
        res.status(200).json(productos);
    }

    //###############
    //RETRIEVE producto
    //###############

    //#############
    //UPDATE producto
    //#############

    actualizarProducto(req, res) {

        const resultId = idTransform.safeParse(req.params.id)

        if (resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const resultBody = productoSchema.safeParse(req.body)
        const productoActualizado = this.productoService.actualizar(resultId.data, resultBody.data)
        if (!productoActualizado) {
            res.status(404).json({
                error: "No existe el producto que se quiere modificar."
            })
        }
        res.status(200).json(productoActualizado);
    }

    //#############
    //UPDATE producto
    //#############

    //#############
    //DELETE producto
    //#############

    eliminarProducto(req, res) {
        const idResult = idTransform.safeParse(req.params.id);
        if (idResult.error) return res.status(400).json(idResult.error.issues);
        const eliminado = this.productoService.eliminarProducto(idResult.data);
        if (!eliminado) return res.status(404).json({error: "Producto no encontrado"});
        res.json({mensaje: "Producto eliminado"});
    }

    //#############
    //DELETE producto
    //#############
}