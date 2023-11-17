import { CarController } from "@controllers/CarController";
import { Router } from "express";
import { Routes } from "./Routes";
import { carImageUpload } from "@middlewares/ImageUploadMiddleware";
import { authenticateToken } from "@middlewares/AuthMiddleware";

export default class CarRoutes implements Routes {
    private path = "/api/v1/cars";
    private controller = new CarController();
    public router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.controller.getCars);
        this.router.get(`${this.path}/:id`, this.controller.getCarById);
        this.router.post(`${this.path}`, authenticateToken, this.controller.createCar);
        this.router.post(`${this.path}/image`, authenticateToken, carImageUpload.single("image"), this.controller.addCarImage);
        this.router.put(`${this.path}/:id`, authenticateToken, this.controller.updateCar);
        this.router.delete(`${this.path}/:id`, authenticateToken, this.controller.deleteCar);
    }
}