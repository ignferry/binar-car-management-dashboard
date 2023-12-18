import { Router } from 'express';
import { Routes } from './Routes';
import { OrderController } from '@controllers/OrderController';
import { authenticateToken } from '@middlewares/AuthMiddleware';

export default class OrderRoutes implements Routes {
  private path = '/api/v1/orders';
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
    this.router.get(
      `${this.path}`,
      authenticateToken,
      this.controller.getOrders,
    );

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
     *                      example: 'bd13c09a-ea6b-4300-9be8-0c140ace209a'
     *                  user_id:
     *                      type: string
     *                      format: uuid
     *                      example: '2741babd-7c11-4bf3-806b-c1d08d58f6ef'
     *                  car_id:
     *                      type: string
     *                      format: uuid
     *                      example: 'bf6b5c43-1377-4ae0-8908-310c64266f81'
     *                  start_rent:
     *                      type: string
     *                      format: date-time
     *                      example: '2023-11-24T12:49:47.216Z'
     *                  finish_rent:
     *                      type: date-time
     *                      format: date-time
     *                      example: '2023-11-24T12:49:47.216Z'
     *                  price:
     *                      type: integer
     *                      example: 1000000
     *                  status:
     *                      type: string
     *                      example: "Selesai"
     *                  created_at:
     *                      type: string
     *                      format: date-time
     *                      example: '2023-11-24T12:49:47.216Z'
     *                  updated_at:
     *                      type: string
     *                      format: date-time
     *                      example: '2023-11-24T12:49:47.216Z'
     */
  }
}
