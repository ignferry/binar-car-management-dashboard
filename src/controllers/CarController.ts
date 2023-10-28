import { Car } from "@models/CarModel";
import { CarService } from "@services/CarService";
import { NextFunction, Request, Response } from "express";
import { join } from "path";

interface IParams {
    id: string;
}

interface IQuery {
    size_type: string;
}

export class CarController {
    public carService = new CarService();

    public getCars = async (req: Request<{}, {}, {}, IQuery>, res: Response, next: NextFunction) => {
        try {
            const cars = await this.carService.getCars(req.query.size_type);
            res.status(200).json(cars);
            next();
        } catch(e) {
            next(e);
        }
    }

    public getCarById = async (req: Request<IParams>, res: Response, next: NextFunction) => {
        try {
            const car = await this.carService.getCarById(req.params.id);
            res.status(200).json(car);
            next();
        } catch (e) {
            next(e);
        }
    }

    public getCarImageById = async (req: Request<IParams>, res: Response, next: NextFunction) => {
        try {
            const car = await this.carService.getCarById(req.params.id);
            res.status(200).sendFile(join(__dirname, `../storage/cars/${car.id}.jpg`));
            next();
        } catch (e) {
            next(e);
        }
    }

    public createCar = async (req: Request<{}, {}, Partial<Car>>, res: Response, next: NextFunction) => {
        try {
            const car = await this.carService.createCar(req.body);
            res.status(201).json(car);
            next();
        } catch (e) {
            next(e);
        }
    }

    public updateCar = async (req: Request<IParams, {}, Partial<Car>>, res: Response, next: NextFunction) => {
        try {
            const car = await this.carService.updateCar(req.params.id, req.body);
            res.status(200).json(car);
            next();
        } catch (e) {
            next(e);
        }
    }

    public deleteCar = async (req: Request<IParams>, res: Response, next: NextFunction) => {
        try {
            const car = await this.carService.deleteCar(req.params.id);
            res.status(200).json(car);
            next();
        } catch (e) {
            next(e);
        }
    }
}