import { z } from "zod";
import { Usuario } from "../models/entities/usuario/usuario.js";
import {usuarioSchema} from "../Middleware/schemas/usuarioSchema.js";
import {idTransform} from "../Middleware/schemas/usuarioSchema.js";


export class UsuarioController {

  constructor(usuarioService) {
    this.usuarioService = usuarioService
  }

  crearUsuario(req, res) {

    const result = usuarioSchema.safeParse(req.body);

    if (result.error) {
      return res.status(400).json(result.error.issues)
    };

    const nuevoUsuario = new Usuario(
      result.data.nombre,
      result.data.email,
      result.data.telefono,
      result.data.tipo
    )

    this.usuarioService.crearUsuario(nuevoUsuario);

    res.status(201).json(nuevoUsuario);
  }

  historialPedidos(req, res){

    const idResult = idTransform.safeParse(req.params.id);

    if (idResult.error) return res.status(400).json(idResult.error.issues);

    res.status(200).json(this.usuarioService.historialPedidos(idResult.data));
  }

}