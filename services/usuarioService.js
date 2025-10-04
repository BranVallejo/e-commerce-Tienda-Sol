export class UsuarioService {
    constructor(usuarioRepo, pedidoService, notificacionService) {
        this.usuarioRepo = usuarioRepo;
        this.pedidoService = pedidoService;
        this.notificacionService = notificacionService;
    }

    async crearUsuario(usuario) {
        return await this.usuarioRepo.create(usuario);
    }

    async obtenerUsuario(id_user) {
        const user = await this.usuarioRepo.findUserByID(id_user);
        if (!user) {throw new NotFoundError(`${id}`);}

        return user;
    }

    async historialPedidos(id) {
        return await this.pedidoService.historialPedido(id);
    }

    // Notificaciones
    
    async obtenerNotificaciones(id) {
        return await this.notificacionService.obtenerNotificaciones(id);
    }

}