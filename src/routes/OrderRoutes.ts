import { Router } from "express";
import { Routes } from "./Routes";
import { OrderController } from "@controllers/OrderController";
import { authenticateToken } from "@middlewares/AuthMiddleware";

export default class OrderRoutes implements Routes {
    private path = "/api/v1/orders";
    private controller = new OrderController();
    public router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authenticateToken, this.controller.getOrders);
    }
}