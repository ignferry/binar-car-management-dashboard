import { Car, CarModel } from "@models/CarModel";
import crypto from "crypto";

export class CarService {
    public async getCars(limit: number, offset: number, minimum_capacity: number, maximum_capacity: number, minimum_available_date?: Date): Promise<CarModel[]> {
        if (minimum_available_date) {
            return await CarModel
                .query()
                .select("*")
                .where("available_at", "<=", minimum_available_date)
                .whereBetween("capacity", [minimum_capacity, maximum_capacity])
                .offset(offset)
                .limit(limit);
        } else {
            return await CarModel
                .query()
                .select("*")
                .whereBetween("capacity", [minimum_capacity, maximum_capacity])
                .offset(offset)
                .limit(limit);
        } 
    }

    public async getCarById(id: string): Promise<CarModel> {
        return await CarModel
            .query()
            .select("*")
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