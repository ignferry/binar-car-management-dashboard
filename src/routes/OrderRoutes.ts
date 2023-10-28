import { Router } from "express";
import { Routes } from "./Routes";
import { OrderController } from "@controllers/OrderController";

export default class OrderRoutes implements Routes {
    private path = "/orders";
    private controller = new OrderController();
    public router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.controller.getOrders);
    }
}