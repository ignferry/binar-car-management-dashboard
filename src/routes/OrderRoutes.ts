import { Router } from "express";

export default class OrderRoutes {
    private path = "/orders";
    public router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`);
    }
}