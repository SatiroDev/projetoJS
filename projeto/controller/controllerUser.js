import { senhaHash } from "../senhaHash/bcryptHash.js"
import { adicionarUsuario, usuariosCadastrados, atualizarInformacoesUsuarios, deletarUsuario, usuarioPeloId } from "../services/userServices.js"

// função para cadastrar usuário
export const cadastrarUsuario = async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        
        const valoresFiltrados = {}

        // funciona pois é certeza que os valores não estão vazio (já passou por verificação)
        valoresFiltrados.name = name.trim().toLowerCase()
        valoresFiltrados.email = email.trim()

        // chama a função para criptográfar a senha
        const passwordHash = await senhaHash(password.trim())
        valoresFiltrados.password = passwordHash
        // chama a função para adicionar o usuário ao Banco de Dados
        const addUser = await adicionarUsuario(valoresFiltrados)
        return res.status(201).json({
            error: false,
            userCreated: addUser
        })

    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        next(err)
    }
}

// função para listar todos os usuários cadastrados
export const listarUsuariosCadastrados =  async (req, res, next) => {
    try {
        const usuarios = await usuariosCadastrados()
        if (usuarios.length === 0) {
            return res.json({
                message: 'Nenhum usuário cadastrado!'
            })
        }
        return res.json({
            error: false,
            registeredUsers: usuarios
        })
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        next(err)
    }
}

// função que procura um usuário pelo ID dele 
export const buscarUsuarioPeloId = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const [existeUsuario] = await usuarioPeloId(id)
        return res.json({
            error: false,
            user: existeUsuario
        })
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        next(err)
    }
}

// função para editar as informações de um usuário existente
export const editarInformacoesUsuario = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const {name, email, password} = req.body
        const valoresFiltrados = {}
        if (name) {
            valoresFiltrados.name = name.trim().toLowerCase()
        }
        if (email) {
            valoresFiltrados.email = email.trim()
        }
        if (password) {
            valoresFiltrados.password = password.trim()
        }
        const atualizarInformacoes = await atualizarInformacoesUsuarios(id, valoresFiltrados)
        if (atualizarInformacoes.length === 0) {
            return res.json({
                message: 'Nenhuma modificação foi feita!'
            })
        }
        return res.json({
            error: false,
            modifiedFields: atualizarInformacoes
        })
    } catch (error) {
        const err =  new Error(error.message)
        err.status = 500
        next(err)
    }
}

// função para deletar o usuário pelo ID
export const deletarUsuarioPeloId = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await deletarUsuario(id)
        return res.json({
            error: false,
            message: `Usuário com o ID '${id}' deletado com sucesso!`
        })

    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        next(err)
    }
}