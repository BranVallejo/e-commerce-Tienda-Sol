import { Filter } from "lucide-react";

export default function BotonToggleFiltros({ mostrarFiltros, onClick }) {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={onClick}
        className="flex items-center space-x-2 bg-white dark:bg-neutral-800 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-neutral-700"
      >
        <Filter className="w-5 h-5" />
        <span className="font-medium">
          {mostrarFiltros ? "Ocultar Filtros" : "Mostrar Filtros"}
        </span>
      </button>
    </div>
  );
}