import mongoose from "mongoose";

// Define o esquema para os carros
const carSchema = new mongoose.Schema({
    model: String,
    stock: Number,
    year: String,
    marca: String,
});

export const Car = mongoose.model("Car", carSchema);

export class CarsController {
    async createCar(req, res) {
        const {
            model,
            stock,
            year,
            marca
        } = req.body;

        //Busca o carro no banco de dados
        const checkCar = await Car.findOne({
            model: model
        });
        if (checkCar) {
            return res.status(400).json({
                error: "Carro já cadastrado"
            });
        }

        const newCar = new Car({
            model,
            stock,
            year,
            marca
        });

        await newCar.save();

        return res
            .status(201)
            .json({
                message: "Carro criado com sucesso",
                newCar
            });
    }

    async listCars(req, res) {
        const cars = await Car.find();

        return res.json(cars);
    }

    async updateCar(req, res) {
        const {
            model,
            stock,
            year,
            marca
        } = req.body;

        const car = await Car.findOne({
            model: model
        });
        if (!car) {
            return res.status(400).json({
                error: "Carro não encontrado"
            });
        }

        car.stock = stock;
        car.year = year;
        car.marca = marca;

        await car.save();

        return res.json(car);
    }

    async deleteCar(req, res) {
        const {
            model
        } = req.body;

        const car = await Car.findOne({
            model: model
        });
        if (!car) {
            return res.status(400).json({
                error: "Carro não encontrado"
            });
        }

        await car.delete();

        return res.json({
            message: "Carro deletado com sucesso"
        });
    }
}
