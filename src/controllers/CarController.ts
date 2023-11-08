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
    pickup_time: Date;
    min_capacity: number;
}

export class CarController {
    public carService = new CarService();

    public getCars = async (req: Request<{}, {}, {}, IQuery>, res: Response, next: NextFunction) => {
        try {
            let limit = req.query.limit || 10;
            let page = Math.max(1, req.query.page) || 1;
            let offset = (page - 1) * limit;
            let minimum_capacity = req.query.min_capacity || 1;
            let maximum_capacity = 999;

            let cars;

            // Size type query
            if (req.query.size_type === "small") {
                maximum_capacity = 2;
            } else if (req.query.size_type === "medium") {
                minimum_capacity = Math.max(3, minimum_capacity);
                maximum_capacity = 4;
            } else if (req.query.size_type === "large") {
                minimum_capacity = Math.max(5, minimum_capacity);
            }

            // Pick up time query
            console.log(req.query.pickup_time)
            console.log(minimum_capacity)
            if (req.query.pickup_time) {
                cars = await this.carService.getCars(limit, offset, minimum_capacity, maximum_capacity, req.query.pickup_time)
            } else {
                cars = await this.carService.getCars(limit, offset, minimum_capacity, maximum_capacity)
            }
           
            res.status(200).json(
                {
                    page: page,
                    limit: limit,
                    data: cars
                }
            );
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