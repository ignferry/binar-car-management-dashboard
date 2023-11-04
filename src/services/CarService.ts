import { Car, CarModel } from "@models/CarModel";
import crypto from "crypto";

export class CarService {
    public async getCars(limit: number, offset: number, minimum_capacity?: number, maximum_capacity?: number): Promise<CarModel[]> {
        if (minimum_capacity && maximum_capacity) {
            return await CarModel
                .query()
                .select(
                    "id", 
                    "image",
                    "manufacture", 
                    "model", 
                    "type", 
                    "rent_per_day", 
                    "description", 
                    "capacity", 
                    "transmission", 
                    "year", 
                    "updated_at"
                )
                .whereBetween("capacity", [minimum_capacity, maximum_capacity])
                .offset(offset)
                .limit(limit);
        } else {
            return await CarModel
                .query()
                .select(
                    "id", 
                    "image",
                    "manufacture", 
                    "model", 
                    "type", 
                    "rent_per_day", 
                    "description", 
                    "capacity", 
                    "transmission", 
                    "year", 
                    "updated_at"
                )
                .offset(offset)
                .limit(limit);
        } 
    }

    public async getCarById(id: string): Promise<CarModel> {
        return await CarModel
            .query()
            .select(
                "id", 
                "image",
                "manufacture", 
                "model", 
                "type", 
                "rent_per_day", 
                "description", 
                "capacity", 
                "transmission", 
                "year", 
                "options",
                "specs",
                "updated_at"
            )
            .findById(id)
            .throwIfNotFound();
    }

    public async createCar(car: Partial<Car>): Promise<CarModel> {
        return await CarModel
            .query()
            .insert(car)
            .throwIfNotFound()
            .returning("*");
    }

    public async addCarImage(file: Express.Multer.File): Promise<String> {
        const uuid = crypto.randomUUID();
        
        return uuid;
    }

    public async updateCar(id: string, car: Partial<Car>): Promise<CarModel> {
        const carArr = await CarModel
            .query()
            .where({ id: id })
            .patch(car)
            .throwIfNotFound()
            .returning("*");

        return carArr[0];
    }

    public async deleteCar(id: string): Promise<CarModel> {
        const carArr = await CarModel
            .query()
            .where({ id: id })
            .del()
            .throwIfNotFound()
            .returning("*");

        return carArr[0];
    }
}