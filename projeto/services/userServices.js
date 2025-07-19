import { pool } from "../db/conexao.js"
import { senhaHash, senhaHashCompare } from "../senhaHash/bcryptHash.js"

// função que adiciona o usuário ao banco de dados
export const adicionarUsuario = async (req) => {
    try {
        const conn = await pool.getConnection()
        // .execute pois usa parâmetros
        await conn.execute(
            `insert into users (name, email, password)
            values (?, ?, ?)`,
            [req.name, req.email, req.password]
        )
        return {name: req.name, email: req.email}
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}

// função para listar usuários cadastrados
export const usuariosCadastrados = async () => {
    try {
        const conn = await pool.getConnection()
        // seleciona apenas id, name e email. (não seleciona a senha!)
        const [listarUsuarios] = await conn.query(
            `select 
                id, name, email
            from users`
        ) 
        return listarUsuarios
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}

// função que busca um usuário pelo ID, e retorna (id, name, email e password)
const usuario = async (id) => {
    const conn = await pool.getConnection()
    const [usuario] = await conn.execute(
        `select * from users
        where id = ?`,
        [id]
    )
    return {id: usuario[0].id, name: usuario[0].name, email: usuario[0].email, password: usuario[0].password}
}

// função que faz as verificações das informações antigas com as atuais
const verificarInformacoes = async (id, req) => {
    const valoresAntigos = await usuario(id)
    const valoresNovos = req
    const dadosAtualizados = {} // objeto que vai ter apenas as informações que são diferentes das antigas
    for (const campo of Object.keys(valoresAntigos)) {
        if (campo === 'password') {
            // compara a senha antiga com a nova (retorna true se forem as mesmas e false se não forem)
            const compararSenhas = await senhaHashCompare(valoresNovos[campo], valoresAntigos[campo])
            // se false (ou seja, se forem diferentes)
            if (!compararSenhas) {
                // senha nova é criptografada
                const senhaNovaHash = await senhaHash(valoresNovos[campo].trim())
                dadosAtualizados[campo] = senhaNovaHash
            }
        }
        else if (valoresAntigos[campo] !== valoresNovos[campo] && valoresNovos[campo] !== undefined) {
            dadosAtualizados[campo] = valoresNovos[campo]
        }
    }
    return dadosAtualizados
}

// função que faz a atualização das informações
export const atualizarInformacoesUsuarios = async (id, req) => {
    try {
        const conn = await pool.getConnection()
        const dadosParaAtualizar = await verificarInformacoes(id, req)
        if (Object.keys(dadosParaAtualizar).length === 0) {
            return []
        }
        const campos = Object.keys(dadosParaAtualizar).map((campo) => `${campo} = ?`).join(', ')
        const valores = Object.values(dadosParaAtualizar)
        const sql = `update users set ${campos} where id = ?`
        await conn.execute(sql,[...valores, id])
        return Object.keys(dadosParaAtualizar) // retorna os nomes dos campos que foram atualizados
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}

// função que deleta um usuário pelo ID
export const deletarUsuario = async (id) => {
    try {
        const conn = await pool.getConnection()
        await conn.execute(
            `delete from users
            where id = ?`,
            [id]
        )
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}

// função que busca um usuário pelo ID, e retorna (id, name, email)
export const usuarioPeloId = async (id) => {
    const conn = await pool.getConnection()
    const [usuario] = await conn.execute(
        `select 
        id, name, email
        from users
        where id = ?`,
        [id]
    )
    return usuario
}