import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import { OrderService } from "services/OrderService";

export class OrderController {
    private carService = new OrderService();

    public getOrders = async (req: Request, res: Response, next: NextFunction) => {

    }
}