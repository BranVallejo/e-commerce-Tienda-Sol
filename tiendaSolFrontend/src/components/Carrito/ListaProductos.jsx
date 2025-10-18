import React from 'react';
import ItemProducto from './ItemProducto';

export default function ListaProductos({ carrito, onEliminar, onActualizar }) {
  
  return (
    <div className="bg-neutral-900 rounded-3xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Productos
      </h2>

      {carrito.length === 0 ? (
        <p className="text-neutral-400">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {carrito.map((producto) => (
            <ItemProducto 
              key={producto.id} 
              producto={producto} 
              onEliminar={onEliminar}
              onActualizarCantidad={onActualizar}
            />
          ))}
        </div>
      )}
    </div>
  );
}