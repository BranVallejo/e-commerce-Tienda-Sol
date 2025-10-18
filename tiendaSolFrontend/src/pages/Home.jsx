import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
//gian

function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/productos")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <div className="text-center text-2xl py-10">Bienvenido a Tienda Sol</div>
      <ProductList products={productos} />
    </>
  );
}

export default Home;
