import { Model, type ModelObject } from 'objection';

export class UserModel extends Model {
  id!: string;
  email!: string;
  password!: string;
  is_admin!: boolean;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    //eslint-disable-line
    return 'users';
  }
}

export type User = ModelObject<UserModel>;
