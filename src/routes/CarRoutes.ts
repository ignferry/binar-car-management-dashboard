import { CarController } from "@controllers/CarController";
import { Router } from "express";
import { Routes } from "./Routes";

export default class CarRoutes implements Routes {
    private path = "/cars";
    private controller = new CarController();
    public router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.controller.getCars);
        this.router.get(`${this.path}/:id`, this.controller.getCarById);
        this.router.get(`${this.path}/:id/image`, this.controller.getCarImageById);
        this.router.post(`${this.path}`, this.controller.createCar);
        this.router.put(`${this.path}/:id`, this.controller.updateCar);
        this.router.delete(`${this.path}/:id`, this.controller.deleteCar);
    }
}