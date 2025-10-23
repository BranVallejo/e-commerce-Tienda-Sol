import React from "react";

export default function OrdersTable({ pedidos }) {

        const testPedidos = [
        {
            _id: "65f042e9a3b6d0c2f8e1a7b4",
            total: 35000,
            cliente: { _id: "CL001", nombre: "Ana García" },
            items: [
            {
                _id: "ITM001",
                nombre: "Teclado Mecánico RGB",
                cantidad: 1,
                precio: 20000,
            },
            {
                _id: "ITM002",
                nombre: "Mouse Inalámbrico",
                cantidad: 2,
                precio: 7500,
            },
            ],
        },
        {
            _id: "65f042e9a3b6d0c2f8e1a7b5",
            total: 15000,
            cliente: { _id: "CL002", nombre: "Jorge Pérez" },
            items: [
            {
                _id: "ITM003",
                nombre: "Monitor 27 Pulgadas",
                cantidad: 1,
                precio: 15000,
            },
            ],
        },
        {
            _id: "65f042e9a3b6d0c2f8e1a7b6",
            total: 8000,
            cliente: { _id: "CL003", nombre: "Marta López" },
            items: [
            {
                _id: "ITM004",
                nombre: "Cable USB-C 2m",
                cantidad: 4,
                precio: 2000,
            },
            ],
        },
        ];

        pedidos = testPedidos;


  return (
    <div className="overflow-x-auto shadow-xl rounded-lg">
      <table className="w-full text-left border-collapse bg-white dark:bg-neutral-800">
        <thead>
          <tr className="text-sm uppercase tracking-wider text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700">
            <th className="p-4 rounded-tl-lg">ID Pedido</th>
            <th className="p-4">Producto</th>
            <th className="p-4 text-center">Cantidad</th>
            <th className="p-4 text-right">Precio Unit.</th>
            <th className="p-4 text-right">Subtotal</th>
            <th className="p-4">Cliente</th>
            <th className="p-4 rounded-tr-lg text-right">Total Pedido</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => {
            // Un pedido puede tener múltiples productos (items)
            return pedido.items.map((item, index) => {
              const isFirstItem = index === 0;
              const rowSpanValue = pedido.items.length;
              const subtotal = item.precio * item.cantidad;

              return (
                <tr
                  key={item._id}
                  className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition duration-150"
                >
                  {/* Columna ID Pedido (Solo se muestra en la primera fila de cada pedido) */}
                  <td className="p-4 font-semibold text-neutral-800 dark:text-neutral-200">
                    {isFirstItem ? (
                        <div rowSpan={rowSpanValue} className="flex flex-col">
                            {pedido._id.substring(0, 8)}...
                        </div>
                    ) : (
                        ""
                    )}
                  </td>
                  
                  {/* Columnas de los Items */}
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">
                    {item.nombre}
                  </td>
                  <td className="p-4 text-center">{item.cantidad}</td>
                  <td className="p-4 text-right">{item.precio}</td>
                  <td className="p-4 font-medium text-right text-green-700 dark:text-green-400">
                    {subtotal}
                  </td>

                  {/* Columna Cliente (Solo se muestra en la primera fila) */}
                  {isFirstItem && (
                    <td rowSpan={rowSpanValue} className="p-4 text-neutral-700 dark:text-neutral-300">
                      {pedido.cliente.nombre}
                    </td>
                  )}

                  {/* Columna Total Pedido (Solo se muestra en la primera fila) */}
                  {isFirstItem && (
                    <td 
                        rowSpan={rowSpanValue} 
                        className="p-4 text-right font-bold text-lg text-red-600 dark:text-red-400"
                    >
                      {pedido.total}
                    </td>
                  )}
                </tr>
              );
            })}
          )}
        </tbody>
      </table>
    </div>
  );
}