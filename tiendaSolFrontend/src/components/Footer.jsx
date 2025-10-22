import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, X } from "lucide-react";

// --- Componente Principal ---

export default function FooterSoloEsteticaConLogosLindos() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Sección de Contenido Principal (4 Columnas) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-neutral-200 dark:border-neutral-700">
          
          {/* Columna 1: Logo, Eslogan y Redes Sociales */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold tracking-wider text-blue-600 dark:text-blue-400">
                Tienda Sol
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                Tu estilo, nuestra pasión.
              </p>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                Síguenos
              </h4>
              <div className="flex space-x-4">
                {/* Íconos de Redes Sociales (Importados para la estética, sin funcionalidad de link) */}
                <div
                  aria-label="Facebook"
                  className="cursor-default text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Facebook className="w-6 h-6" /> 
                </div>
                <div
                  aria-label="Instagram"
                  className="cursor-default text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </div>
                {/* Usamos el ícono 'X' de Twitter/X */}
                <div
                  aria-label="X (Twitter)"
                  className="cursor-default text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <X className="w-6 h-6" /> 
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna 2: Links de la Empresa (solo texto) */}
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3 border-b border-neutral-300 dark:border-neutral-700 pb-1">
              Empresa
            </h4>
            <nav className="flex flex-col space-y-2">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
                Acerca de Nosotros
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
                Trabaja con Nosotros
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
                Política de Privacidad
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
                Términos y Condiciones
              </div>
            </nav>
          </div>

          {/* Columna 3: Links de Soporte (solo texto) */}
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3 border-b border-neutral-300 dark:border-neutral-700 pb-1">
              Soporte
            </h4>
            <nav className="flex flex-col space-y-2">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
                FAQ
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
                Devoluciones y Cambios
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
                Métodos de Pago
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
                Seguimiento de Pedido
              </div>
            </nav>
          </div>
          
          {/* Columna 4: Contacto con Íconos lindos de lucide-react */}
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3 border-b border-neutral-300 dark:border-neutral-700 pb-1">
              Contáctanos
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                {/* Ícono de ubicación importado */}
                <MapPin className="w-4 h-4 mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                Av. Principal 123, CABA
              </li>
              <li className="flex items-center">
                {/* Ícono de correo importado */}
                <Mail className="w-4 h-4 mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                contacto@tiendasol.com
              </li>
              <li className="flex items-center">
                {/* Ícono de teléfono importado */}
                <Phone className="w-4 h-4 mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                +54 11 5555-5555
              </li>
            </ul>
          </div>
        </div>

        {/* Sección de Copyright y Legal (solo texto) */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 dark:text-neutral-400">
          <span>&copy; 2025 Tienda Sol. Todos los derechos reservados.</span>
          <div className="mt-2 md:mt-0 space-x-4">
            <div className="cursor-default hover:text-neutral-700 dark:hover:text-neutral-300">Privacidad</div>
            <div className="cursor-default hover:text-neutral-700 dark:hover:text-neutral-300">Términos</div>
          </div>
        </div>
      </div>
    </footer>
  );
}