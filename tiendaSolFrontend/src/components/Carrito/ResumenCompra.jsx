import React from 'react';

export default function ResumenCompra({ carrito }) {

    const subtotal = carrito.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);

    const envio = 0;
    const total = subtotal + envio;

    const formatearMoneda = (valor) => {
        return `$${valor}`;
    };

    return (

        <div className="bg-neutral-900 rounded-3xl p-6 sticky top-28">

            <h2 className="text-2xl font-semibold mb-6 text-white">
                Resumen
            </h2>

            <div className="grid grid-cols-2 gap-y-3 mb-6">

                <span className="text-neutral-300">Productos</span>
                <span className="text-white text-right font-medium">
                    {formatearMoneda(subtotal)}
                </span>


                <span className="text-neutral-300">Envíos</span>
                <span className="text-white text-right font-medium">
                    {formatearMoneda(envio)}
                </span>
            </div>

            <hr className="my-4 border-neutral-700" />

            <div className="grid grid-cols-2 items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-xl text-white text-right font-bold">
                    {formatearMoneda(total)}
                </span>
            </div>

            <button
                className="w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-full transition
                   hover:bg-indigo-600 disabled:opacity-50"
                disabled={carrito.length === 0}
            >
                Pagar
            </button>
        </div>
    );
}