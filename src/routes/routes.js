import {
    Router
} from "express";
import { UserController } from "../controllers/UserController.js";
import { CarsController } from "../controllers/CarsController.js";

const routes = Router();

routes.post('/logUser', new UserController().logUser)
routes.post('/createUser', new UserController().createUser)

routes.get('/getCars', new CarsController().getCars)
routes.post('/createCar', new CarsController().createCar)
routes.put('/updateCar', new CarsController().updateCar)
routes.delete('/deleteCar', new CarsController().deleteCar)

export default routes;