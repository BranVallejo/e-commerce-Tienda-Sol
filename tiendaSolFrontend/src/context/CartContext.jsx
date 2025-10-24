import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const mapProductToCartItem = (producto, cantidad = 1) => {
  const id = producto._id ?? producto.id;
  return {
    id,
    nombre: producto.nombre,
    precio: Number(producto.precio) || 0,
    cantidad: Number(cantidad) || 1,
    vendedorId: producto.vendedor?._id ?? producto.vendedorId ?? "sin_vendedor",
    nombreVendedor: producto.vendedor?.nombre ?? producto.nombreVendedor ?? "Vendedor desconocido",
    fotos: producto.fotos ?? producto.images ?? [],
    stock: producto.stock ?? null,
    raw: producto 
  };
};

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("carrito");
    if (saved) setCarrito(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const nuevoItem = mapProductToCartItem(producto, cantidad);

    setCarrito((prev) => {
      const existente = prev.find((p) => p.id === nuevoItem.id);

      if (existente) {
        return prev.map((p) =>
          p.id === nuevoItem.id
            ? {
                ...p,
                cantidad: Math.max(
                  1,
                  (p.cantidad || 0) + (Number(cantidad) || 0)
                ),
              }
            : p
        );
      }

      return [...prev, nuevoItem];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const cantidadNum = Number(nuevaCantidad);
    if (Number.isNaN(cantidadNum)) return;

    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, cantidad: Math.max(1, Math.floor(cantidadNum)) }
          : p
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const groupedCart = useMemo(() => {
    if (!carrito || carrito.length === 0) return {};
    return carrito.reduce((acc, item) => {
      const vendorId = item.vendedorId ?? "sin_vendedor";
      if (!acc[vendorId]) {
        acc[vendorId] = {
          nombreVendedor: item.nombreVendedor || "Vendedor desconocido",
          items: [],
          subtotal: 0,
        };
      }
      acc[vendorId].items.push(item);
      acc[vendorId].subtotal += (Number(item.precio) || 0) * (Number(item.cantidad) || 0);
      return acc;
    }, {});
  }, [carrito]);


  const crearPedido = () => {
    console.log("holaaa")
  }

  return (
    <CartContext.Provider
      value={{
        carrito,
        groupedCart,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        setCarrito,
        crearPedido
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
