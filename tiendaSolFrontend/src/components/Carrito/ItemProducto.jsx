import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ItemProducto({ producto, onEliminar, onActualizarCantidad }) {

    const formatearMoneda = (valor) => {
        return `$${valor}`;
    };

    return (

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 bg-slate-800 p-4 rounded-2xl">

            <div className="flex items-center gap-4 flex-grow min-w-[200px]">

                <div className="w-5 h-5 border-2 border-slate-500 rounded-full flex-shrink-0"></div>

                <div className="bg-white p-1 rounded-lg flex-shrink-0">
                    <img
                        src={producto.imagen || 'https://via.placeholder.com/100'}
                        alt={producto.nombre}
                        className="w-20 h-20 object-cover rounded-md"
                    />
                </div>

                <div className="flex-grow">
                    <p className="text-lg font-medium text-white truncate">
                        {producto.nombre}
                    </p>
                    <button
                        onClick={() => onEliminar(producto.id)}
                        className="text-red-500 hover:text-red-400 text-sm font-medium transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>


            <div className="flex items-center gap-4 flex-grow justify-end lg:flex-grow-0">

                <div className="w-28 text-right flex-shrink-0">
                    <p className="text-lg font-medium text-white">
                        {formatearMoneda(producto.precio)}
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-lg p-1 text-neutral-900 flex-shrink-0">
                    <button
                        onClick={() => onActualizarCantidad(producto.id, producto.cantidad - 1)}
                        className="p-1 text-neutral-600 hover:bg-neutral-200 rounded disabled:opacity-30"
                        disabled={producto.cantidad <= 1}
                    >
                        <Minus className="w-4 h-4" />
                    </button>

                    <span className="w-8 text-center font-medium">
                        {producto.cantidad}
                    </span>

                    <button
                        onClick={() => onActualizarCantidad(producto.id, producto.cantidad + 1)}
                        className="p-1 text-neutral-600 hover:bg-neutral-200 rounded"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    );
}