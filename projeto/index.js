import express from "express";
import dotenv from "dotenv";
import routerUsers from "./routes/routerUser.js";
import { errorGlobal } from "./middlewares/erroGlobal.js";
import { createTable } from "./db/createTableUsers.js";

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use('/', routerUsers)

app.use(errorGlobal)

app.listen(PORT, async () => {
    await createTable()
    console.log(`Servidor rodando na porta "${PORT}"`)
})