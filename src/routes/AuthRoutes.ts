import { Router } from "express";
import { Routes } from "./Routes";
import { UserController } from "@controllers/UserController";

export default class AuthRoutes implements Routes {
    private path = "/api/v1/auth";
    private controller = new UserController();
    public router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/login`, this.controller.login);
    }
}