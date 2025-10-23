import React from 'react'
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function ProductDetailCart({producto, manejarAgregarAlCarrito, setCantidad, cantidad}) {



  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
        <div className="flex items-center border rounded-xl overflow-hidden border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
            <button
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            className="px-4 py-2 text-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
            −
            </button>
            <span className="px-5 text-lg font-semibold">{cantidad}</span>
            <button
            onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
            className="px-4 py-2 text-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
            +
            </button>
        </div>

        <button
            onClick={manejarAgregarAlCarrito}
            disabled={producto.stock === 0}
            className={`flex-1 py-3 font-semibold rounded-xl transition flex items-center justify-center space-x-2 ${
            producto.stock > 0
                ? "bg-blue-600 hover:bg-blue-500 text-white dark:bg-green-600 dark:hover:bg-green-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
            <ShoppingCart className="w-5 h-5" />
            <span>Agregar al carrito</span>
        </button>
    </div>
  )
}
