import { useState } from 'react';
import ResumenCompra from '../components/Carrito/ResumenCompra';
import ListaProductos from '../components/Carrito/ListaProductos';

const carritoDeEjemplo = [
  {
    id: 1,
    nombre: 'Teclado Gamer 60%...',
    precio: 20000,
    cantidad: 1,
    imagen: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    nombre: 'SSD 1TB',
    precio: 10000,
    cantidad: 2,
    imagen: 'https://via.placeholder.com/100',
  },
];

export default function Cart() { 
  const [carrito, setCarrito] = useState(carritoDeEjemplo);

  const handleEliminarProducto = (idProducto) => {
    setCarrito(carritoActual => 
      carritoActual.filter(producto => producto.id !== idProducto)
    );
  };

  const handleActualizarCantidad = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad < 1) return; 
    setCarrito(carritoActual => 
      carritoActual.map(producto => 
        producto.id === idProducto 
          ? { ...producto, cantidad: nuevaCantidad } 
          : producto
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-light text-center mb-12 uppercase tracking-widest">
        Carrito
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="lg:w-2/3">
          <ListaProductos 
            carrito={carrito} 
            onEliminar={handleEliminarProducto}
            onActualizar={handleActualizarCantidad}
          />
        </div>

        <div className="lg:w-1/3">
          <ResumenCompra carrito={carrito} />
        </div>

      </div>
    </div>
  );
}