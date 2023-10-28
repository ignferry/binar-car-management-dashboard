import { OrderModel } from "@models/OrderModel";

export class OrderService {
    public async getOrders(): Promise<OrderModel[]> {
        return await OrderModel.query();
    }
}