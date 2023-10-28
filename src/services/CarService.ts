import { Car, CarModel } from "@models/CarModel";

export class CarService {
    public async getCars(size_type?: string): Promise<CarModel[]> {
        if (size_type) {
            return await CarModel
                .query()
                .select("id", "type", "rent_per_day", "updated_at")
                .where({ size_type: size_type });
        } else {
            return await CarModel
                .query()
                .select("id", "type", "rent_per_day", "updated_at");
        } 
    }

    public async getCarById(id: string) {

    }

    public async createCar(car: Partial<Car>) {

    }

    public async updateCar(id:string, car: Partial<Car>) {

    }

    public async deleteCar(id: string) {

    }
}