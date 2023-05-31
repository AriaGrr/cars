import mongoose from "mongoose";

// Define o esquema para os carros
const carSchema = new mongoose.Schema({
    model: String,
    stock: Number,
    year: String,
    brand: String,
});

export const Car = mongoose.model("Car", carSchema);

export class CarsController {
    async createCar(req, res) {
        const {
            model,
            stock,
            year,
            brand
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
            brand
        });

        await newCar.save();

        return res
            .status(201)
            .json({
                message: "Carro criado com sucesso",
                newCar
            });
    }

    async getCars(req, res) {
        const cars = await Car.find();

        return res.json(cars);
    }

    async updateCar(req, res) {
        const {
            _id,
            model,
            stock,
            year,
            brand
        } = req.body;

        const car = await Car.findOne({
            _id: _id
        });
        if (!car) {
            return res.status(400).json({
                error: "Carro não encontrado"
            });
        }

        car.model = model;
        car.stock = stock;
        car.year = year;
        car.brand = brand;

        await car.save();

        return res.json(car);
    }

    async deleteCar(req, res) {
        const {
            _id
        } = req.body;

        const car = await Car.findOne({
            _id: _id
        });
        if (!car) {
            return res.status(400).json({
                error: "Carro não encontrado"
            });
        }

        await car.deleteOne();

        return res.json({
            message: "Carro deletado com sucesso"
        });
    }
}
