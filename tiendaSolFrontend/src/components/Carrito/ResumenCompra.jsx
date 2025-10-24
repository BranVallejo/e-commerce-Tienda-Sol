import React from "react";
import { useCart } from "../../context/CartContext";

export default function ResumenCompra({vendedorId, subtotal }) {

  const { crearPedido } = useCart();

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-300 dark:border-neutral-700 shadow-md">
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
        Resumen del pedido
      </h3>

      <div className="flex justify-between text-neutral-700 dark:text-neutral-300 mb-3">
        <span>Subtotal:</span>
        <span>${subtotal}</span>
      </div>

      <button
        onClick={() => crearPedido(vendedorId)}
        className="w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition"
      >
        Pagar y generar pedido
      </button>
    </div>
  );
}
