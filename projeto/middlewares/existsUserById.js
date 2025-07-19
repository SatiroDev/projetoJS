import { pool } from "../db/conexao.js";

// função que procura um usuário pelo ID 
export const existsUserById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const conn = await pool.getConnection()
        const [existUser] = await conn.execute(
            `select * from users
            where id = ?`,
            [id]
        )
        if (existUser.length === 0) {
            const err = new Error(`Usuário com o ID '${id}' não encontrado!`)
            err.status = 404
            throw err
        }
        next()
    } catch (error) {
        next(error)
    }
}