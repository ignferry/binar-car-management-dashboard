import { Router } from 'express';
/**
 * @openapi
 * tags:
 *  -   name: Auth
 *      description: Authentication endpoints
 *  -   name: Cars
 *      description: Car resource endpoints
 *  -   name: Orders
 *      description: Order resource endpoints
 */

export interface Routes {
  router: Router;
}
