import { Producto } from "../entities/producto/producto"; 

export class ProductoRepository {

    //TODO: ver el tema de la generacion de los id's de los productos

    //C.R.U.D basico

    private productos: Map<number, Producto> = new Map();

    create(prod: Producto) :Producto {

        this.productos.set(prod.getId(), prod)
        return prod;
    }

    findById(id: number): Producto | undefined {

        return this.productos.get(id);
    }

    findAll(): Producto[] {

        return Array.from(this.productos.values());
    }

    update(producto: Producto): Producto {

        if (!this.productos.has(producto.getId())) {
            throw new Error("Producto no encontrado");
        }
        this.productos.set(producto.getId(), producto);
        return producto;
    }

    delete(id: number):boolean{
        
        return this.productos.delete(id)
    }

}