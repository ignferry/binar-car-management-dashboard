import { Router } from "express";

export default class CarRoutes {
    private path = "/cars";
    public router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`);
        this.router.get(`${this.path}/:id`);
        this.router.post(`${this.path}`);
        this.router.put(`${this.path}/:id`);
        this.router.delete(`${this.path}/:id`);
    }
}