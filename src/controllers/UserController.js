import mongoose from "mongoose";

// Define o esquema para os usuários
const userCarsSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
});

export const UserCars = mongoose.model("UserCars", userCarsSchema);
export class UserController {
    async createUser(req, res) {
        const {
            name,
            username,
            password
        } = req.body;

        //Busca o usuário no banco de dados
        const checkUser = await UserCars.findOne({
            username: username
        });
        if (checkUser) {
            return res.status(400).json({
                error: "username já utilizado"
            });
        }

        const newUser = new UserCars({
            name,
            username,
            password
        });

        await newUser.save();

        return res
            .status(201)
            .json({
                message: "Usuário criado com sucesso",
                newUser
            });
    }

    async logUser(req, res) {
        const {
            username,
            password
        } = req.body;

        //Busca o usuário no banco de dados
        const user = await UserCars.findOne({
            username: username
        });
        if (!user) {
            return res.status(400).json({
                error: "Usuário ou senha incorreto"
            });
        }

        const passwordMatch = user.password == password

        if (!passwordMatch) {
            return res.status(400).json({
                error: "Usuário ou senha incorreto"
            });
        }

        return res.status(200)
    }
}
