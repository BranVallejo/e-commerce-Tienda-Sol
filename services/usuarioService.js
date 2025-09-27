export class UsuarioService {
    constructor(usuarioRepo, pedidoService) {
        this.usuarioRepo = usuarioRepo;
        this.pedidoService = pedidoService;
    }

    crearUsuario(usuario) {
        return this.usuarioRepo.create(usuario);
    }

    findUserByID(id_user) {
        return this.usuarioRepo.findUserByID(id_user);
    }

    historialPedidos(id) {
        return this.pedidoService.historialPedido(id);
    }

}