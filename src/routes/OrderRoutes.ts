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
                /**
         * @openapi
         * /api/v1/orders:
         *  get:
         *      summary: Get orders
         *      description: Get orders
         *      tags: [Orders]
         *      security:
         *      -   bearerAuth: []
         *      produces:
         *          - application/json
         *      responses:
         *          '200':
         *              description: Get cars success
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/Order'
         */
        this.router.get(`${this.path}`, authenticateToken, this.controller.getOrders);

        // Schemas
        /**
         * @openapi
         * components:
         *      schemas:
         *          Order:
         *              type: object
         *              properties:
         *                  id: 
         *                      type: string
         *                      format: uuid
         *                  user_id:
         *                      type: string
         *                      format: uuid
         *                  car_id:
         *                      type: string
         *                      format: uuid
         *                  start_rent:
         *                      type: date-time
         *                  finish_rent:
         *                      type: date-time
         *                  price:
         *                      type: integer
         *                  status:
         *                      type: string
         *                  created_at:
         *                      type: string
         *                      format: date-time
         *                  updated_at:
         *                      type: string
         *                      format: date-time
         */
    }
}