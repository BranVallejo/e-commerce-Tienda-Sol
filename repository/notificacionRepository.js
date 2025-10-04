export class NotificacionRepository {
    constructor() {
        this.notificaciones = [];
        this.id = 1;
    }

    create(notificacion) {
        notificacion.setId(this.id);
        this.id++;
        this.notificaciones.push(notificacion);
        return Promise.resolve(notificacion);
    }

    obtenerNotificacionesDeUsuario(idUsuario) {
        const notificacionesUsuario = this.notificaciones.filter(n => n.usuarioDestino == idUsuario);
        return Promise.resolve(notificacionesUsuario);
    }
}