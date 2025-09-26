import {z} from "zod";
import {Usuario} from "../models/entities/usuario/usuario.js";
import {parsearUsuario, idTransform} from "../Middleware/schemas/usuarioSchemaValidator.js";
import {asyncHandler} from "../Middleware/asyncHandler.js";


export class UsuarioController {

    constructor(usuarioService) {
        this.usuarioService = usuarioService
    }

    crearUsuario(req, res, next) {

        const nuevoUsuario = parsearUsuario(req)
        this.usuarioService.crearUsuario(nuevoUsuario)
            .then(usuarioCreado => {
               return res.status(201).json(usuarioCreado);
            })
            .catch(error => {
                next(error);
            })

    }

    historialPedidos = asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.userId, 10);
        const idResult = idTransform.safeParse(req.params.id);

        if (idResult.error) {
            throw idResult.error;
        }

        res.status(200).json(this.usuarioService.historialPedidos(idResult.data));
    });

    historialPedidos(req, res, next) {
        const idResult = idTransform.safeParse(req.params.id);
    }
}

/*
        Promise.resolve()
            .then(() => {
                const nuevoUsuario = parsearUsuario(req)
                return this.usuarioService.crearUsuario(nuevoUsuario);
            })
            .then(usuarioCreado => {
                res.status(201).json(usuarioCreado);
            })
            .catch(error => {
                next(error);
            });*/