import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
    routes
} from "./routes/routes.js";


dotenv.config();

const dbUrl = process.env.MONGODB_URI || "";
const app = express();

app.use(express.json());
app.use(express.static("./public"));


function startServer() {
    app.listen(
        3000
    )
    console.log("Servidor rodando")
}

mongoose.connect(dbUrl).then(
    () => {
        console.log("Conectado ao banco de dados com sucesso")
        startServer()
    }
).catch(
    (err) => {
        console.log(err)
    }
)