import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  ChevronDown,
  FileText,
} from "lucide-react";
import generarFactura from "./generadorFactura";

const ESTADOS = ["PENDIENTE", "CONFIRMADO", "ENVIADO", "ENTREGADO", "CANCELADO"];

export default function SalesPanel({sellerId}) {
  const [pedidos, setPedidos] = useState([]);
  const [estados, setEstados] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/pedidos/?vendedorID=${sellerId}`); // Cambiá por tu endpoint real
        if (!res.ok) throw new Error("Error al obtener pedidos");
        const data = await res.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPedidos();
  }, []);


  useEffect(() => {
    if (pedidos.length > 0) {
      const nuevosEstados = pedidos.reduce(
        (acc, p) => ({ ...acc, [p._id]: p.estado || "PENDIENTE" }),
        {}
      );
      setEstados(nuevosEstados);
    }
  }, [pedidos]);


  const handleEstadoChange = (id, nuevoEstado) => {
    setEstados((prev) => ({ ...prev, [id]: nuevoEstado }));
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "CONFIRMADO":
        return <Package className="text-blue-500 w-5 h-5" />;
      case "ENVIADO":
        return <Truck className="text-purple-500 w-5 h-5" />;
      case "ENTREGADO":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "CANCELADO":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return null;
    }
  };


  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleString("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (loading) {
    return (
      <div className="p-10 text-center text-neutral-500 dark:text-neutral-300">
        Cargando pedidos...
      </div>
    );
  }


  if (pedidos.length === 0) {
    return (
      <div className="p-10 text-center text-neutral-500 dark:text-neutral-300">
        No hay pedidos todavía.
      </div>
    );
  }


  return (
    <div className="p-10 dark:bg-neutral-900">
      <div className="mx-auto bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        <header className="flex items-center justify-between p-8 border-b border-neutral-200 dark:border-neutral-700">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
            Panel de Ventas
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            {pedidos.length} pedidos totales
          </p>
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
              {pedidos.map((pedido) => (
                <tr
                  key={pedido._id}
                  className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/30"
                >
                  <td className="p-5 font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                    {pedido._id}
                  </td>

                  <td className="p-5 text-neutral-800 dark:text-neutral-200 font-medium">
                    {pedido.compradorID}
                  </td>

                  <td className="p-5 text-neutral-700 dark:text-neutral-300">
                    <ul className="space-y-1">
                      {pedido.itemsPedido.map((item) => (
                        <li key={item._id} className="flex justify-between">
                          <span className="truncate font-medium">{item.productoID}</span>
                          <span className="text-neutral-500 text-sm">
                            x{item.cantidad}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="p-5 text-sm text-neutral-700 dark:text-neutral-300">
                    <details>
                      <summary className="flex items-center gap-2 cursor-pointer text-purple-600 dark:text-purple-400 font-medium">
                        <MapPin className="w-4 h-4" />
                        Ver dirección
                        <ChevronDown className="w-3 h-3" />
                      </summary>
                      <div className="mt-2 pl-6 text-xs sm:text-sm space-y-0.5 text-neutral-600 dark:text-neutral-400">
                        <p>
                          {pedido.direccionEntrega.calle} {pedido.direccionEntrega.altura}
                          {pedido.direccionEntrega.piso &&
                            `, Piso ${pedido.direccionEntrega.piso}`}
                          {pedido.direccionEntrega.departamento &&
                            `, Dpto ${pedido.direccionEntrega.departamento}`}
                        </p>
                        <p>
                          {pedido.direccionEntrega.ciudad},{" "}
                          {pedido.direccionEntrega.provincia}
                        </p>
                        <p>{pedido.direccionEntrega.pais}</p>
                        <p>CP: {pedido.direccionEntrega.codigoPostal}</p>
                      </div>
                    </details>
                  </td>

                  <td className="p-5 text-right font-bold text-green-600 dark:text-green-400">
                    ${pedido.total.toLocaleString("es-AR")}
                  </td>

                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getEstadoIcon(estados[pedido._id])}
                      <select
                        value={estados[pedido._id]}
                        onChange={(e) =>
                          handleEstadoChange(pedido._id, e.target.value)
                        }
                        className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-sm focus:ring-2 focus:ring-purple-500"
                      >
                        {ESTADOS.map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td className="p-5 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    {formatearFecha(pedido.fechaCreacion)}
                  </td>

                  <td className="p-5 text-center">
                    <button
                      onClick={() => generarFactura(pedido)}
                      className="flex items-center gap-2 mx-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md"
                    >
                      <FileText className="w-4 h-4" />
                      Factura
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
