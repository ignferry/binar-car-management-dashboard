import { Model, type ModelObject } from 'objection';

export class OrderModel extends Model {
  id!: string;
  user_id!: string;
  car_id!: string;
  start_rent!: Date;
  finish_rent!: Date;
  price!: number;
  status!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    //eslint-disable-line
    return 'orders';
  }
}

export type Order = ModelObject<OrderModel>;
