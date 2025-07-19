import { pool } from "./conexao.js";


// função para criar a tabela 'users'
export const createTable = async () => {
    try {
        const conn = await pool.getConnection()
        // .query pois não usa parâmetros
        await conn.query(
            `create table if not exists users (
                id int primary key auto_increment,
                name varchar(200) not null,
                email varchar(200) not null unique,
                password varchar(255) not null,
                createdAt timestamp default current_timestamp,
                updatedAt timestamp default current_timestamp on update current_timestamp
            )`
        )
        console.log('Tabela criada com sucesso!')
    } catch (error) {
        console.error('Erro ao criar tabela' + error.message)
    }
}

