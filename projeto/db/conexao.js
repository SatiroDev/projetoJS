import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // se todas as conexões estiverem ocupadas, as novas requisições vão esperar até liberar uma conexão.
    connectionLimit: 10, // número máximo de de conexões simultâneas
    queueLimit: 0 // limite de requisições que pode ficar na fila esperando (0 -> ilimitado)
})
