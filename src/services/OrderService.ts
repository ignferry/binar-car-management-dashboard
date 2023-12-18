import type { OrderModel } from '@models/OrderModel';
import { OrderRepository } from '@repositories/OrderRepository';

export class OrderService {
  private readonly orderRepository = new OrderRepository();

  public async getOrders(): Promise<OrderModel[]> {
    return await this.orderRepository.getOrders();
  }
}
