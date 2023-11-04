import { Car } from "@models/CarModel";
import { CarService } from "@services/CarService";
import { NextFunction, Request, Response } from "express";
import { join } from "path";
import NoFileReceivedException from "@exceptions/NoFileReceivedException";

interface IParams {
    id: string;
}

interface IQuery {
    size_type: string;
    page: number;
    limit: number;
}

export class CarController {
    public carService = new CarService();

    public getCars = async (req: Request<{}, {}, {}, IQuery>, res: Response, next: NextFunction) => {
        try {
            let limit = req.query.limit || 10;
            let page = Math.max(1, req.query.page) || 1;
            let offset = (page - 1) * limit;

            let cars;
            if (!req.query.size_type){
                cars = await this.carService.getCars(limit, offset);
            } else {
                if (req.query.size_type === "small") {
                    cars = await this.carService.getCars(limit, offset, 1, 2);
                } else if (req.query.size_type === "medium") {
                    cars = await this.carService.getCars(limit, offset, 3, 4);
                } else if (req.query.size_type === "large") {
                    cars = await this.carService.getCars(limit, offset, 5, 999);
                } else {
                    cars = await this.carService.getCars(limit, offset);
                }
            }
           
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
            res.status(200).sendFile(join(__dirname, "..", "..", "storage", "cars", `${car.id}.jpg`));
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

    public addCarImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                throw new NoFileReceivedException();
            }
            res.status(200).json(
                {
                    filename: req.file.filename
                }
            )
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