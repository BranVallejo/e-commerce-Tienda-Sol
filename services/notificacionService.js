export class NotificacionService {
    constructor(notificacionRepo) {
        this.notificacionRepo = notificacionRepo;
    }

    async crearNotificacion(notificacion) {
        return await this.notificacionRepo.create(notificacion);
    }

    async obtenerNotificaciones(idUsuario) {
        const notificaciones = await this.notificacionRepo.obtenerNotificacionesDeUsuario(idUsuario);
        return notificaciones || [];
    }   
}