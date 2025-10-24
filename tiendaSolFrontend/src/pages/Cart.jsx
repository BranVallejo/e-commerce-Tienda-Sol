import ResumenCompra from "../components/Carrito/ResumenCompra";
import ListaProductos from "../components/Carrito/ListaProductos";
import { useCart } from "../context/CartContext";
import React from 'react';


export default function Cart() {
  const { carrito, groupedCart, eliminarDelCarrito, actualizarCantidad } = useCart(); 

  const vendedoresIds = Object.keys(groupedCart);
  const totalGeneral = Object.values(groupedCart).reduce((sum, g) => sum + g.subtotal, 0);

  if (!carrito || carrito.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center min-h-[50vh] bg-neutral-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-50">
        <h1 className="text-4xl font-light mb-12 uppercase tracking-widest">
          Carrito de Compras
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mt-10">
          Tu carrito está vacío
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wider text-gray-900 dark:text-gray-50">
        Carrito de Compras
      </h1>

      <div className="space-y-10">
        {vendedoresIds.map((vendedorId) => {
          const grupoVendedor = groupedCart[vendedorId];

          return (
            <div 
              key={vendedorId} 
              className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:shadow-3xl"
            >
              <h2 className="text-2xl font-bold mb-6 border-b border-neutral-200 dark:border-neutral-700 pb-3 text-gray-900 dark:text-gray-50">
                Pedido de: <span className="text-indigo-600 dark:text-indigo-400">{grupoVendedor.nombreVendedor}</span>
              </h2>

              <div className="flex flex-col lg:flex-row gap-8">
                
                <div className="lg:w-2/3">
                  <ListaProductos
                    carrito={grupoVendedor.items} 
                    onEliminar={eliminarDelCarrito}
                    onActualizar={actualizarCantidad}
                  />
                </div>

                <div className="lg:w-1/3">
                  <ResumenCompra 
                    vendedorId={vendedorId}
                    subtotal={grupoVendedor.subtotal}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}