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
         * /api/v1/auth/register:
         *  post:
         *      summary: Register
         *      description: Register
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
         *              description: Registration successful
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *                                  example: "Registration successful"
         *          '400':
         *              description: Request body does not follow defined contract
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          $ref: '#/components/schemas/BadRequestError'
         *          '409':
         *              description: Request body value violates a constraint
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          $ref: '#/components/schemas/ConstraintViolationError'
         */
        this.router.post(`${this.path}/register`, this.controller.register);

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
         *          '400':
         *              description: Request body does not follow defined contract
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          $ref: '#/components/schemas/BadRequestError'
         *          '401':
         *              description: Wrong authentication credentials
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          $ref: '#/components/schemas/WrongAuthCredentialsError'
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