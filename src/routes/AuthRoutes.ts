import { Router } from 'express';
import type { Routes } from './Routes';
import { UserController } from '@controllers/UserController';
import { body } from 'express-validator';
import { handleValidation } from '@middlewares/ExpressValidationMiddleware';

export default class AuthRoutes implements Routes {
  private readonly path = '/api/v1/auth';
  private readonly controller = new UserController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const validateAuthBody = [
      body('email').isEmail(),
      body('password').isLength({ min: 8 }),
      handleValidation,
    ];

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
     *                              example: 'admin2@gmail.com'
     *                          password:
     *                              type: string
     *                              format: password
     *                              example: password
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
    this.router.post(
      `${this.path}/register`,
      validateAuthBody,
      this.controller.register,
    );

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
     *                              example: admin@gmail.com
     *                          password:
     *                              type: string
     *                              format: password
     *                              example: password
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
    this.router.post(
      `${this.path}/login`,
      validateAuthBody,
      this.controller.login,
    );

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
