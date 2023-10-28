import { Model, ModelObject } from "objection";

export class UserModel extends Model {
    id!: string;
    email!: string;
    password!: string;
    is_admin!: boolean;
    created_at!: Date;
    updated_at!: Date;
}

export type Users = ModelObject<UserModel>;