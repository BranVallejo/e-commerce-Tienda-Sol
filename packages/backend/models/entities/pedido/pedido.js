import { Usuario } from "../usuario/usuario.js"; 
import { EstadoPedido } from "./estadoPedido.js";
import { Moneda } from "../moneda.js";
import { ItemPedido } from  "./itemPedido.js";
import { DireccionEntrega } from "./direccionEntrega.js";
import { CambioEstadoPedido } from "./cambioEstadoPedido.js";


export class Pedido {
    constructor(id, comprador, items, total, moneda, direccionEntrega, estado, fechaCreacion, historialEstados) {
        this.id = id;
        this.comprador = comprador;
        this.items = items;
        this.total = total;
        this.moneda = moneda;
        this.direccionEntrega = direccionEntrega;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.historialEstados = [];
    }
}
