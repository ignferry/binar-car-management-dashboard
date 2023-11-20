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
        /**
         * @openapi
         * /api/v1/auth/login:
         *  post:
         *      summary: Login
         *      description: Login
         *      tags: [Auth]
         *      produces:
         *          - application/json
         *      requestBody:
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          email:
         *                              type: string
         *                              format: email
         *                          password:
         *                              type: string
         *                              format: password
         *      responses:
         *          '200':
         *              description: Create car success
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              token:
         *                                  type: string
         */
        this.router.post(`${this.path}/login`, this.controller.login);

                /**
         * @openapi
         * components:
         *      securitySchemes:
         *          bearerAuth:
         *              type: http
         *              scheme: bearer
         *              bearerFormat: JWT   
         */
    }
}