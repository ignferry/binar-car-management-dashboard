import { Car, CarModel } from '@models/CarModel';
import { CarRepository } from '@repositories/CarRepository';

export class CarService {
  private carRepository = new CarRepository();

  public async getCars(
    limit: number,
    page: number,
    minimum_capacity: number,
    maximum_capacity: number,
    minimum_available_date?: Date,
  ): Promise<CarModel[]> {
    return await this.carRepository.getCars(
      limit,
      page,
      minimum_capacity,
      maximum_capacity,
      minimum_available_date,
    );
  }

  public async getCarById(id: string): Promise<CarModel> {
    return await this.carRepository.getCarById(id);
  }

  public async createCar(
    car: Partial<Car>,
    user_id: string,
  ): Promise<CarModel> {
    return await this.carRepository.createCar(car, user_id);
  }

  public async updateCar(
    id: string,
    car: Partial<Car>,
    user_id: string,
  ): Promise<CarModel> {
    return await this.carRepository.updateCar(id, car, user_id);
  }

  public async deleteCar(id: string, user_id: string): Promise<CarModel> {
    return await this.carRepository.deleteCar(id, user_id);
  }
}
