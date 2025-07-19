import express from "express"
import { validarCadastroUsuario, validarAtualizacaoUsuario } from "../validation/validationUser.js"
import { cadastrarUsuario, listarUsuariosCadastrados, buscarUsuarioPeloId, editarInformacoesUsuario, deletarUsuarioPeloId } from "../controller/controllerUser.js"
import { existsUserById } from "../middlewares/existsUserById.js"

const router = express.Router()

router.post('/users', validarCadastroUsuario, cadastrarUsuario)

router.get('/users', listarUsuariosCadastrados)

router.get('/users/:id', existsUserById, buscarUsuarioPeloId)

router.put('/users/:id', existsUserById, validarAtualizacaoUsuario, editarInformacoesUsuario)

router.delete('/users/:id', existsUserById, deletarUsuarioPeloId)

export default router
