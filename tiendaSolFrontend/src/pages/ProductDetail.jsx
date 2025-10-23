import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import ProductDetailCarrousel from "../components/ProductDetail/ProductDetailCarrousel.jsx";
import ProductDetailInfo from "../components/ProductDetail/ProductDetailInfo.jsx";
import ProductDetailCart from "../components/ProductDetail/ProductDetailCart.jsx";


export default function DetalleProducto() {
    const { idProducto } = useParams();
    const { agregarAlCarrito } = useCart();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos/${idProducto}`)
      .then((response) => response.json())
      .then((data) => {
        setProducto(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Cargando producto...
      </div>
    );
  }

  const manejarAgregarAlCarrito = () => {
    agregarAlCarrito({ ...producto, cantidad });
  };





  return  (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 px-6 py-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">

        <ProductDetailCarrousel producto={producto}/>
        
        <div className="p-8 flex flex-col justify-between space-y-6">

          <ProductDetailInfo producto={producto} />

          <ProductDetailCart producto={producto} manejarAgregarAlCarrito={manejarAgregarAlCarrito} setCantidad={setCantidad} cantidad={cantidad} />


        </div>
      </div>
    </div>
  );
}
