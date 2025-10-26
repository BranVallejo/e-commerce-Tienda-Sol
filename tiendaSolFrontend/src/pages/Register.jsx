// components/RegisterForm.jsx
import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            throw new Error(data.message || "Error en el registro");
          }
          return data;
        });
      })
      .then((data) => {
        // Si el registro es exitoso
        setSuccess("Usuario registrado exitosamente!");

        // Guardar el token en localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        console.log("tengo el token: ", data.token);

        // Limpiar el formulario
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          password: "",
          telefono: "",
        });

        // Redirigir después del registro
        // window.location.href = '/dashboard';
      })
      .catch((err) => {
        setError(err.message || "Error al registrar usuario");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear tu cuenta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mensajes de éxito y error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {/* Nombre y Apellido en misma fila */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="apellido"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <div className="mt-1">
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    required
                    value={formData.apellido}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <div className="mt-1">
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="+54 11 1234-5678"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            {/* Botón de Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>

          {/* Enlace a Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
