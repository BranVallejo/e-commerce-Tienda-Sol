import { usuarioSchema } from "../middleware/schemas/usuarioSchema.js";
import { JWTGenerator } from "../utils/jwtGenerator.js"; // ← SOLO esto

export class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  async crearUsuario(req, res, next) {
    const nuevoUsuario = usuarioSchema.parsearUsuario(req); // ← .body importante!
    console.log("📝 Creando usuario:", nuevoUsuario.email);

    await this.usuarioService
      .crearUsuario(nuevoUsuario)
      .then((usuarioCreado) => {
        // ✅ GENERAR TOKEN de forma delegada
        const token = JWTGenerator.generarToken(usuarioCreado._id);

        console.log("✅ Usuario creado:", usuarioCreado._id);

        return res.status(201).json({
          success: true,
          message: "Usuario registrado exitosamente",
          token, // ← JWT para el cliente
          user: {
            id: usuarioCreado._id,
            nombre: usuarioCreado.nombre,
            apellido: usuarioCreado.apellido,
            email: usuarioCreado.email,
            telefono: usuarioCreado.telefono,
            fechaCreacion: usuarioCreado.fechaCreacion,
          },
        });
      })
      .catch((error) => {
        console.error("❌ Error creando usuario:", error);
        next(error);
      });
  }

  async logearUsuario(req, res, next) {
    const { email, password } = req.body;
    console.log("🔐 Intentando login para:", email);

    // Validar que vengan email y password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son obligatorios",
      });
    }

    await this.usuarioService
      .buscarPorEmail(email)
      .then(async (usuario) => {
        if (!usuario) {
          return res.status(400).json({
            success: false,
            message: "Credenciales inválidas",
          });
        }

        // Verificar password
        const esPasswordValido = await usuario.comparePassword(password);
        if (!esPasswordValido) {
          return res.status(400).json({
            success: false,
            message: "Credenciales inválidas",
          });
        }

        console.log("✅ Login exitoso para:", usuario.email);

        // Generar JWT
        const token = JWTGenerator.generarToken(usuario._id);

        // Responder con token
        return res.json({
          success: true,
          message: "Login exitoso",
          token,
          user: {
            id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            fechaCreacion: usuario.fechaCreacion,
          },
        });
      })
      .catch((error) => {
        console.error("❌ Error en login:", error);
        next(error);
      });
  }

  async obtenerUsuario(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    await this.usuarioService
      .obtenerUsuario(idResult)
      .then((usuario) => {
        return res.status(200).json(usuario);
      })
      .catch((error) => {
        next(error);
      });
  }

  async historialPedidos(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    const { page = 1, limit = 10 } = req.query;

    await this.usuarioService
      .historialPedidos(idResult, page, limit)
      .then((historial) => {
        return res.status(200).json(historial);
      })
      .catch((error) => {
        next(error);
      });
  }

  // Notificaciones

  async obtenerNotificaciones(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    const { page = 1, limit = 10, leidas = null } = req.query;

    await this.usuarioService
      .obtenerNotificaciones(idResult, leidas, page, limit)
      .then((notificaciones) => {
        return res.status(200).json(notificaciones);
      })
      .catch((error) => {
        next(error);
      });
  }

  obtenerNotificacionesNoLeidas(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    this.usuarioService
      .obtenerNotificacionesNoLeidas(idResult)
      .then((notificaciones) => {
        return res.status(200).json(notificaciones);
      })
      .catch((error) => {
        next(error);
      });
  }

  obtenerNotificacionesLeidas(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    this.usuarioService
      .obtenerNotificacionesLeidas(idResult)
      .then((notificaciones) => {
        return res.status(200).json(notificaciones);
      })
      .catch((error) => {
        next(error);
      });
  }

  async marcarLectura(req, res, next) {
    const idUsuarioResult = usuarioSchema.parsearIdString(req.params.id);
    const idNotificacionResult = usuarioSchema.parsearIdString(
      req.params.idNotificacion
    );

    const camposActualizados = req.body;

    return await this.usuarioService
      .marcarLectura(idUsuarioResult, idNotificacionResult, camposActualizados)
      .then((nuevaNotificaciones) => {
        return res.status(200).json(nuevaNotificaciones);
      })
      .catch((error) => {
        next(error);
      });
  }
}
