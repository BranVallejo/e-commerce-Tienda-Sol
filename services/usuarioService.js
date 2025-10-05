import { Usuario } from "../models/entities/usuario/usuario.js";
import { UsuarioModel } from "../schemasDB/usuarioSchema.js";

export class UsuarioService {
  constructor(usuarioRepo, pedidoService, notificacionService) {
    this.usuarioRepo = usuarioRepo;
    this.pedidoService = pedidoService;
    this.notificacionService = notificacionService;
    this.usuarioSchema = UsuarioModel;
  }

  async crearUsuario(usuarioData) {
    const usuario = await new this.usuarioSchema(usuarioData);
    return await usuario.save();
  }

  async obtenerUsuario(id_user) {
    const user = await this.usuarioSchema.findById(id_user);

    if (!user) {
      throw new NotFoundError(`${id}`); //TODO: lanzar un error posta
    }

    return user;
  }

  async historialPedidos(id) {
    return await this.pedidoService.historialPedido(id);
  }

  // Notificaciones

  async obtenerNotificaciones(id) {
    return await this.notificacionService.obtenerNotificaciones(id);
  }

  async obtenerNotificacionesNoLeidas(id) {
    return await this.notificacionService.obtenerNotificacionesNoLeidas(id);
  }

  async obtenerNotificacionesLeidas(id) {
    return await this.notificacionService.obtenerNotificacionesLeidas(id);
  }

  async marcarComoLeida(idNotificacion) {
    return await this.notificacionService.marcarComoLeida(idNotificacion);
  }
}
