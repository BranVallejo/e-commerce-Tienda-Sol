import { useState } from "react";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Zapatillas Urban Classic",
    price: 34999,
    description:
      "Diseño limpio, materiales de alta calidad y una comodidad superior. Inspiradas en el movimiento urbano moderno.",
    image:
      "https://ferreira.vtexassets.com/arquivos/ids/424314-800-auto?v=638388548002630000&width=800&height=auto&aspect=true",
    stock: 10,
  };

  const handleAddToCart = () => {
    alert(`Agregaste ${quantity} ${product.name} al carrito`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-sm overflow-hidden grid md:grid-cols-2 gap-0">
        <div className="bg-neutral-100 flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-10 flex flex-col justify-between space-y-10">
          <div>
            <h1 className="text-4xl font-semibold text-neutral-900 mb-4">
              {product.name}
            </h1>
            <p className="text-neutral-600 leading-relaxed text-lg">
              {product.description}
            </p>
            <p className="mt-8 text-4xl font-bold text-neutral-900">
              ${product.price.toLocaleString("es-AR")}
            </p>
            <p className="text-sm text-neutral-400 mt-2">
              {product.stock > 0
                ? `Stock disponible: ${product.stock}`
                : "Sin stock disponible"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg text-neutral-700 hover:bg-neutral-100 transition"
              >
                −
              </button>
              <span className="px-5 text-lg font-medium text-neutral-800">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="px-4 py-2 text-lg text-neutral-700 hover:bg-neutral-100 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 text-lg font-medium rounded-xl transition ${
                product.stock > 0
                  ? "bg-neutral-900 text-white hover:bg-neutral-800"
                  : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
              }`}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
