import logger from "@utils/logger";
import { Car } from "@models/CarModel";
import { CarService } from "@services/CarService";
import { NextFunction, Request, Response } from "express";

interface IParams {
    id: string;
}

interface IQuery {
    size_type: string;
}

export class CarController {
    public carService = new CarService();

    public getCars = async (req: Request<{}, {}, {}, IQuery>, res: Response, next: NextFunction) => {
        const cars = await this.carService.getCars(req.query.size_type);
        res.status(200).json(cars);

        next();
    }

    public getCarById = async (req: Request<IParams>, res: Response, next: NextFunction) => {

    }

    public createCar = async (req: Request<{}, {}, Partial<Car>>, res: Response, next: NextFunction) => {

    }

    public updateCar = async (req: Request<IParams, {}, Partial<Car>>, res: Response, next: NextFunction) => {
        
    }

    public deleteCar = async (req: Request<IParams>, res: Response, next: NextFunction) => {

    }
}