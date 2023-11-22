import { CarController } from "@controllers/CarController";
import { Router } from "express";
import { Routes } from "./Routes";
import { carImageUpload } from "@middlewares/ImageUploadMiddleware";
import { authenticateToken } from "@middlewares/AuthMiddleware";

export default class CarRoutes implements Routes {
    private path = "/api/v1/cars";
    private controller = new CarController();
    public router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
      /**
       * @openapi
       * /api/v1/cars:
       *  get:
       *      summary: Get cars
       *      description: Get cars, paginated and filtered
       *      tags: [Cars]
       *      produces:
       *          - application/json
       *      parameters:
       *          -   in: query
       *              name: page
       *              schema:
       *                  type: integer
       *              description: Page of the requested data
       *          -   in: query
       *              name: limit
       *              schema:
       *                  type: integer
       *              description: Maximum number of data in the response
       *          -   in: query
       *              name: size_type
       *              schema:
       *                  type: string
       *                  enum: ['small', 'medium', 'large']
       *              description: Size type which indicates the capacity of the vehicle (small, medium, large)
       *          -   in: query
       *              name: pickup_time
       *              schema:
       *                  type: string
       *                  format: date-time
       *              description: The time at which the vehicle has to be available
       *          -   in: query
       *              name: min_capacity
       *              schema:
       *                  type: integer
       *              description: Minimum vehicle capacity
       *      responses:
       *          '200':
       *              description: Get cars success
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          properties:
       *                              page:
       *                                  type: integer
       *                              limit:
       *                                  type: integer
       *                              data:
       *                                  type: array
       *                                  items:
       *                                      $ref: '#/components/schemas/Car'
       */
      this.router.get(`${this.path}`, this.controller.getCars);

      /**
       * @openapi
       * /api/v1/cars/{id}:
       *  get:
       *      summary: Get car by ID
       *      description: Get car by ID
       *      tags: [Cars]
       *      produces:
       *          - application/json
       *      parameters:
       *          -   in: path
       *              name: id
       *              schema:
       *                  type: string
       *                  format: uuid
       *              description: UUID of a car
       *      responses:
       *          '200':
       *              description: Get car by ID success
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/Car'
       *          '404':
       *              description: No car with given ID is found
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#components/schemas/NotFoundError'
       */
      this.router.get(`${this.path}/:id`, this.controller.getCarById);

      /**
       * @openapi
       * /api/v1/cars:
       *  post:
       *      summary: Create car
       *      description: Create car
       *      tags: [Cars]
       *      security:
       *      -   bearerAuth: []
       *      produces:
       *          - application/json
       *      requestBody:
       *          content:
       *              application/json:
       *                  schema:
       *                      type: object
       *                      $ref: '#/components/schemas/CarInput'
       *      responses:
       *          '201':
       *              description: Create car success
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/Car'
       *          '400':
       *              description: Request body does not follow defined contract
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/BadRequestError'
       *          '401':
       *              description: No JWT Token Provided
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/NoTokenError'
       *          '403':
       *              description: Invalid JWT Token
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/InvalidTokenError'
       *          '409':
       *              description: Request body value violates a constraint
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/ConstraintViolationError'
       *
       */
      this.router.post(
        `${this.path}`,
        authenticateToken,
        this.controller.createCar
      );

      /**
       * @openapi
       * /api/v1/cars/image:
       *  post:
       *      summary: Upload car image
       *      description: Upload car image
       *      tags: [Cars]
       *      security:
       *      -   bearerAuth: []
       *      produces:
       *          - application/json
       *      requestBody:
       *          content:
       *              multipart/form-data:
       *                  schema:
       *                      type: object
       *                      properties:
       *                          image:
       *                              type: string
       *                              format: binary
       *      responses:
       *          '200':
       *              description: Upload car image success
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          properties:
       *                              filename:
       *                                  type: string
       *          '400':
       *              description: Request body does not follow defined contract
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/BadRequestError'
       *          '401':
       *              description: No JWT Token Provided
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/NoTokenError'
       *          '403':
       *              description: Invalid JWT Token
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/InvalidTokenError'
       */
      this.router.post(
        `${this.path}/image`,
        authenticateToken,
        carImageUpload.single("image"),
        this.controller.addCarImage
      );

      /**
       * @openapi
       * /api/v1/cars/{id}:
       *  put:
       *      summary: Update car
       *      description: Update car
       *      tags: [Cars]
       *      security:
       *      -   bearerAuth: []
       *      produces:
       *          - application/json
       *      parameters:
       *          -   in: path
       *              name: id
       *              schema:
       *                  type: string
       *                  format: uuid
       *              description: UUID of a car
       *      requestBody:
       *          content:
       *              application/json:
       *                  schema:
       *                      type: object
       *                      $ref: '#/components/schemas/CarInput'
       *      responses:
       *          '200':
       *              description: Update car success
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/Car'
       *          '400':
       *              description: Request body does not follow defined contract
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/BadRequestError'
       *          '401':
       *              description: No JWT Token Provided
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/NoTokenError'
       *          '403':
       *              description: Invalid JWT Token
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/InvalidTokenError'
       *          '404':
       *              description: No car with given ID is found
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#components/schemas/NotFoundError'
       *          '409':
       *              description: Request body value violates a constraint
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/ConstraintViolationError'
       */
      this.router.put(
        `${this.path}/:id`,
        authenticateToken,
        this.controller.updateCar
      );

      /**
       * @openapi
       * /api/v1/cars/{id}:
       *  delete:
       *      summary: Delete car
       *      description: Delete car
       *      tags: [Cars]
       *      security:
       *      -   bearerAuth: []
       *      produces:
       *          - application/json
       *      parameters:
       *          -   in: path
       *              name: id
       *              schema:
       *                  type: string
       *                  format: uuid
       *              description: UUID of a car
       *      responses:
       *          '200':
       *              description: Delete car success
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/Car'
       *          '401':
       *              description: No JWT Token Provided
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/NoTokenError'
       *          '403':
       *              description: Invalid JWT Token
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#/components/schemas/InvalidTokenError'
       *          '404':
       *              description: No car with given ID is found
       *              content:
       *                  application/json:
       *                      schema:
       *                          type: object
       *                          $ref: '#components/schemas/NotFoundError'
       */
      this.router.delete(
        `${this.path}/:id`,
        authenticateToken,
        this.controller.deleteCar
      );

      // Schemas
      /**
       * @openapi
       * components:
       *      schemas:
       *          Car:
       *              type: object
       *              properties:
       *                  id:
       *                      type: string
       *                      format: uuid
       *                  plate:
       *                      type: string
       *                  manufacture:
       *                      type: string
       *                  model:
       *                      type: string
       *                  image:
       *                      type: string
       *                  rent_per_day:
       *                      type: integer
       *                  capacity:
       *                      type: integer
       *                      minimum: 1
       *                  description:
       *                      type: string
       *                  available_at:
       *                      type: string
       *                      format: date-time
       *                  transmission:
       *                      type: string
       *                  available:
       *                      type: boolean
       *                  type:
       *                      type: string
       *                  year:
       *                      type: integer
       *                  options:
       *                      type: array
       *                      items:
       *                          type: string
       *                  specs:
       *                      type: array
       *                      items:
       *                          type: string
       *                  created_at:
       *                      type: string
       *                      format: date-time
       *                  updated_at:
       *                      type: string
       *                      format: date-time
       */

      /**
       * @openapi
       * components:
       *      schemas:
       *          CarInput:
       *              type: object
       *              properties:
       *                  plate:
       *                      type: string
       *                  manufacture:
       *                      type: string
       *                  model:
       *                      type: string
       *                  image:
       *                      type: string
       *                  rent_per_day:
       *                      type: integer
       *                  capacity:
       *                      type: integer
       *                      minimum: 1
       *                  description:
       *                      type: string
       *                  available_at:
       *                      type: string
       *                      format: date-time
       *                  transmission:
       *                      type: string
       *                  available:
       *                      type: boolean
       *                  type:
       *                      type: string
       *                  year:
       *                      type: integer
       *                  options:
       *                      type: array
       *                      items:
       *                          type: string
       *                  specs:
       *                      type: array
       *                      items:
       *                          type: string
       */
    }
}