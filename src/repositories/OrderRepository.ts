import { OrderModel } from '@models/OrderModel';

export class OrderRepository {
  public async getOrders(): Promise<OrderModel[]> {
    return await OrderModel.query();
  }
}
