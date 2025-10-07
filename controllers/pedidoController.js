import { Pedido } from "../models/entities/pedido/pedido.js";
import { ItemPedido } from "../models/entities/pedido/itemPedido.js";
import { pedidoSchema } from "../middleware/schemas/pedidoSchema.js";
import { id } from "zod/locales";

export class PedidoController {
  constructor(pedidoService) {
    this.pedidoService = pedidoService;
  }

  // async crearPedido(req, res, next) {
  //   const result = pedidoSchema.parsearPedido(req);

  //   // console.log(
  //   //   "🔍 1. Body recibido en crearPedido:",
  //   //   JSON.stringify(req.body, null, 2)
  //   // );

  //   //console.log(result.data.itemsPedido);

  //   await Promise.all(
  //     result.data.itemsPedido.map(async (i) => {
  //       //console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: "+i);
  //       await this.pedidoService
  //         .getPrecioUnitario(i.productoID)
  //         .then(
  //           (precioUnitario) => {
  //             console.log("precioUnitario es: ", i.precioUnitario);
  //             new ItemPedido(i.productoID, i.cantidad, precioUnitario)
  //           }

  //         );
  //     })
  //   )
  //     .then((itemsInstanciados) => {
  //       const nuevoPedido = new Pedido(
  //         result.data.comprador,
  //         itemsInstanciados,
  //         result.data.moneda,
  //         result.data.direccionEntrega
  //       );

  //       return this.pedidoService
  //         .crearPedido(nuevoPedido)
  //         .then(() => nuevoPedido);
  //     })
  //     .then((nuevoPedido) => res.status(201).json(nuevoPedido))
  //     .catch((error) => next(error));
  // }

  crearPedido(req, res, next) {
  const result = pedidoSchema.parsearPedido(req);

  console.log("🧾 Pedido recibido:", JSON.stringify(result.data, null, 2));

  // 1️⃣ Crear todos los items con su precio unitario
  Promise.all(
    result.data.itemsPedido.map((i) => {
      return this.pedidoService
        .getPrecioUnitario(i.productoID)
        .then((precioUnitario) => {
          console.log(`💰 Producto ${i.productoID} -> Precio unitario: ${precioUnitario}`);
          return new ItemPedido(i.productoID, i.cantidad, precioUnitario);
        });
    })
  )
    // 2️⃣ Cuando todos los items están listos, crear el pedido
    .then((itemsInstanciados) => {
      const nuevoPedido = new Pedido(
        result.data.compradorID,         // 👈 importante: tu esquema usa compradorID, no comprador
        itemsInstanciados,
        result.data.moneda,
        result.data.direccionEntrega
      );

      console.log("📦 Pedido instanciado:", JSON.stringify(nuevoPedido, null, 2));

      // 3️⃣ Guardar en base de datos
      return this.pedidoService.crearPedido(nuevoPedido)
        .then(() => nuevoPedido); // devolvemos el pedido para el siguiente .then
    })
    // 4️⃣ Enviar respuesta HTTP
    .then((nuevoPedido) => {
      res.status(201).json(nuevoPedido);
    })
    // 5️⃣ Manejo de errores
    .catch((error) => {
      console.error("❌ Error al crear pedido:", error);
      next(error);
    });
}

  listarPedidos(req, res, next) {
    const { page = 1, limit = 10 } = req.query;

    this.pedidoService
      .listarPedidos(page, limit)
      .then((pedidos) => {
        return res.status(200).json({ pedidos });
      })
      .catch((error) => next(error));
  }

  obtenerPedido(req, res, next) {
    const idResult = pedidoSchema.parsearId(req);

    this.pedidoService
      .obtenerPedido(idResult)
      .then((pedido) => res.status(200).json(pedido))
      .catch((error) => next(error));
  }

  eliminarPedido(req, res, next) {
    const idResult = pedidoSchema.parsearId(req);

    this.pedidoService
      .eliminarPedido(idResult)
      .then((pedidoEliminado) => {
        res.status(200).json({
          mensaje: `Pedido ${idResult} eliminado con éxito`,
          //pedido: pedidoEliminado
        });
      })
      .catch((error) => next(error));
  }

  actualizarEstado(req, res, next) {
    const idResult = pedidoSchema.parsearId(req);
    const nuevoEstado = pedidoSchema.parsearEstado(req);

    this.pedidoService
      .actualizarEstado(idResult, nuevoEstado)
      .then((pedidoActualizado) => {
        res.status(200).json({
          mensaje: `Pedido actualizado al estado ${pedidoActualizado.getEstado()} con éxito`,
          pedido: pedidoActualizado,
        });
      })
      .catch((error) => next(error));
  }
}
