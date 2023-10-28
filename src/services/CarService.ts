import { Car, CarModel } from "@models/CarModel";

export class CarService {
    public async getCars(size_type?: string): Promise<CarModel[]> {
        if (size_type) {
            return await CarModel
                .query()
                .select("id", "name", "type", "rent_per_day", "updated_at")
                .where({ size_type: size_type });
        } else {
            return await CarModel
                .query()
                .select("id", "name", "type", "rent_per_day", "updated_at");
        } 
    }

    public async getCarById(id: string): Promise<CarModel> {
        return await CarModel
            .query()
            .select("id", "name", "rent_per_day", "size_type")
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