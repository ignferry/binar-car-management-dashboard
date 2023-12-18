import { Car, CarModel } from '@models/CarModel';

export class CarRepository {
  public async getCars(
    limit: number,
    page: number,
    minimum_capacity: number,
    maximum_capacity: number,
    minimum_available_date?: Date,
  ): Promise<CarModel[]> {
    let query = CarModel.query()
      .select('*')
      .whereBetween('capacity', [minimum_capacity, maximum_capacity])
      .where({
        deleted_at: null,
      })
      .page(page, limit);

    if (minimum_available_date) {
      query = query.where('available_at', '<=', minimum_available_date);
    }

    return (await query).results;
  }

  public async getCarById(id: string): Promise<CarModel> {
    return await CarModel.query()
      .select('*')
      .findById(id)
      .where({
        deleted_at: null,
      })
      .throwIfNotFound();
  }

  public async createCar(
    car: Partial<Car>,
    user_id: string,
  ): Promise<CarModel> {
    return await CarModel.query()
      .insert({
        ...car,
        ...{
          creator_id: user_id,
        },
      })
      .returning('*');
  }

  public async updateCar(
    id: string,
    car: Partial<Car>,
    user_id: string,
  ): Promise<CarModel> {
    return await CarModel.query()
      .patchAndFetchById(id, {
        ...car,
        ...{
          last_updater_id: user_id,
        },
      })
      .where({
        deleted_at: null,
      })
      .throwIfNotFound()
      .returning('*');
  }

  public async deleteCar(id: string, user_id: string): Promise<CarModel> {
    return await CarModel.query()
      .patchAndFetchById(id, { deleted_at: new Date(), deleter_id: user_id })
      .where({
        deleted_at: null,
      })
      .throwIfNotFound()
      .returning('*');
  }
}
