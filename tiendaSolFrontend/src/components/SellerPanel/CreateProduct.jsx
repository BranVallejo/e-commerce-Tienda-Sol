import { useState } from "react";
import { X, Plus, Image as ImageIcon, Tag, DollarSign, Package } from "lucide-react";

const CATEGORIAS = ["PANTALON", "CAMPERA", "ZAPATO", "REMERA"];

export default function CreateProduct({ sellerId }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categorias: [],
    precio: 0,
    stock: 0,
    fotos: [],
    activo: true,
    vendedor: sellerId,
  });

  const [fotoInput, setFotoInput] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false); // opcional: loader mientras se envía

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "categorias") {
      setForm((prev) => {
        if (checked) {
          return { ...prev, categorias: [...prev.categorias, value] };
        } else {
          return { ...prev, categorias: prev.categorias.filter((c) => c !== value) };
        }
      });
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "precio" || name === "stock") {
      const numValue = value === "" ? 0 : parseInt(value);
      setForm((prev) => ({ ...prev, [name]: numValue >= 0 ? numValue : 0 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddFoto = () => {
    if (fotoInput.trim() !== "") {
      setForm((prev) => ({ ...prev, fotos: [...prev.fotos, fotoInput.trim()] }));
      setFotoInput("");
    }
  };

  const handleRemoveFoto = (url) => {
    setForm((prev) => ({ ...prev, fotos: prev.fotos.filter((f) => f !== url) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando formulario:", JSON.stringify(form));
    if (!form.nombre || form.precio <= 0) {
      setMensaje("El nombre y el precio deben ser válidos.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Producto creado:", data);
      setMensaje("✅ Producto creado exitosamente!");

      setForm({
        nombre: "",
        descripcion: "",
        categorias: [],
        precio: 0,
        stock: 0,
        fotos: [],
        activo: true,
        vendedor: sellerId,
      });
    } catch (error) {
      console.error("Error creando producto:", error);
      setMensaje("❌ Error al crear el producto.");
    } finally {
      setLoading(false);
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  const inputClass =
    "w-full p-3 border rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
  const labelClass = "block mb-2 font-semibold text-neutral-800 dark:text-neutral-200";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 sm:px-6 py-12 transition-colors duration-500">
      <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 p-6 sm:p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-4">
          Crear Nuevo Producto
        </h1>

        {mensaje && (
          <p
            className={`mb-6 p-3 rounded-xl font-medium ${
              mensaje.startsWith("✅")
                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                : "bg-red-100 text-red-700"
            }`}
          >
            {mensaje}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className={labelClass}>
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Pantalón Jeans"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="descripcion" className={labelClass}>
              Descripción
            </label>
            <textarea
              name="descripcion"
              id="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Detalles del producto..."
              className={inputClass}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="precio" className={labelClass}>
                <DollarSign className="inline w-4 h-4 mr-1 mb-1 text-green-500" /> Precio ($)
              </label>
              <input
                type="number"
                name="precio"
                id="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="stock" className={labelClass}>
                <Package className="inline w-4 h-4 mr-1 mb-1 text-orange-500" /> Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              <Tag className="inline w-4 h-4 mr-1 mb-1 text-blue-500" /> Categorías
            </label>
            <div className="flex flex-wrap gap-4">
              {CATEGORIAS.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="categorias"
                    value={cat}
                    checked={form.categorias.includes(cat)}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-neutral-900 dark:text-neutral-100">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="fotoInput" className={labelClass}>
              <ImageIcon className="inline w-4 h-4 mr-1 mb-1 text-purple-500" /> Fotos (URLs)
            </label>
            <div className="flex gap-3 mb-3 flex-wrap sm:flex-nowrap">
              <input
                type="url"
                value={fotoInput}
                onChange={(e) => setFotoInput(e.target.value)}
                placeholder="http://ejemplo.com/imagen.jpg"
                className="flex-1 p-3 border rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
              <button
                type="button"
                onClick={handleAddFoto}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition"
              >
                <Plus className="w-5 h-5 mr-1" /> Agregar
              </button>
            </div>
            <div className="flex gap-3 flex-wrap">
              {form.fotos.map((f, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 group"
                >
                  <img
                    src={f}
                    alt={`Foto ${idx}`}
                    className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFoto(f)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-white transition-opacity"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-xl font-bold text-lg mt-6 transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "Creando..." : "Crear Producto"}
          </button>
        </form>
      </div>
    </div>
  );
}
