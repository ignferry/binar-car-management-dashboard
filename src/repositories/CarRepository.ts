import { Car, CarModel } from "@models/CarModel";

export class CarRepository {
    public async getCars(limit: number, page: number, minimum_capacity: number, maximum_capacity: number, minimum_available_date?: Date): Promise<CarModel[]> {
        let query = CarModel
            .query()
            .select("*")
            .whereBetween("capacity", [minimum_capacity, maximum_capacity])
            .page(page, limit);

        
        if (minimum_available_date) {
            query = query.where("available_at", "<=", minimum_available_date);
        }

        return (await query).results;
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
            .returning("*");
    }

    public async updateCar(id: string, car: Partial<Car>): Promise<CarModel> {
        return await CarModel
            .query()
            .patchAndFetchById(id, car)
            .throwIfNotFound()
            .returning("*");
    }

    public async deleteCar(id: string): Promise<CarModel> {
        return (await CarModel
            .query()
            .deleteById(id)
            .throwIfNotFound()
            .returning("*"))[0];
    }
}