import { NextFunction, Request, Response } from 'express';
import { OrderService } from 'services/OrderService';

export class OrderController {
  private carService = new OrderService();

  public getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const orders = await this.carService.getOrders();
      res.status(200).json(orders);
      next();
    } catch (e) {
      next(e);
    }
  };
}
