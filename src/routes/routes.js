import {
    Router
} from "express";
import { UserController } from "../controllers/UserController.js";


export const routes = Router();

routes.get('/logUser', new UserController().logUser)
routes.get('/createUser', new UserController().createUser)

