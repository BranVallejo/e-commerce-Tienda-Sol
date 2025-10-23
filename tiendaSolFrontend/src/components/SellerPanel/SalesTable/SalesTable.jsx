import React, { useState, useEffect } from "react";
import FilaPedido from "./FilaPedido";

export default function SalesPanel({ sellerId }) {
  const [pedidos, setPedidos] = useState([]);
  const [estados, setEstados] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/pedidos/?vendedorID=${sellerId}`);
        if (!res.ok) throw new Error("Error al obtener pedidos");
        const data = await res.json();
        setPedidos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    obtenerPedidos();
  }, []);

  useEffect(() => {
    if (pedidos.length > 0) {
      setEstados(pedidos.reduce((acc, p) => ({ ...acc, [p._id]: p.estado || "PENDIENTE" }), {}));
    }
  }, [pedidos]);


  const handleEstadoChange = async (id, nuevoEstado) => {
    setEstados(prev => ({ ...prev, [id]: nuevoEstado }));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/pedidos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (!res.ok) throw new Error("Error al actualizar el estado");
    } catch {
      const pedidoOriginal = pedidos.find(p => p._id === id);
      setEstados(prev => ({ ...prev, [id]: pedidoOriginal?.estado || "PENDIENTE" }));
      alert("No se pudo actualizar el estado");
    }
  };

  if (loading) return <div className="p-10 text-center text-neutral-500 dark:text-neutral-300">Cargando pedidos...</div>;
  if (!pedidos.length) return <div className="p-10 text-center text-neutral-500 dark:text-neutral-300">No hay pedidos todavía.</div>;

  return (
    <div className="p-10 dark:bg-neutral-900">
      <div className="mx-auto bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        <header className="flex items-center justify-between p-8 border-b border-neutral-200 dark:border-neutral-700">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">Panel de Ventas</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">{pedidos.length} pedidos totales</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead className="bg-neutral-200/50 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-5 text-left">Pedido</th>
                <th className="p-5 text-left">Comprador</th>
                <th className="p-5 text-left">Productos</th>
                <th className="p-5 text-left">Entrega</th>
                <th className="p-5 text-right">Total</th>
                <th className="p-5 text-center">Estado</th>
                <th className="p-5 text-center">Fecha</th>
                <th className="p-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(pedido => (
                <FilaPedido
                  key={pedido._id}
                  pedido={pedido}
                  estado={estados[pedido._id]}
                  onEstadoChange={handleEstadoChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
