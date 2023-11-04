import { Model, ModelObject } from "objection";

export class CarModel extends Model {
    id!: string;
    plate!: string;
    manufacture!: string;
    model!: string;
    image!: string;
    rent_per_day!: number;
    capacity!: number;
    description!: string;
    available_at!: Date;
    transmission!: string;
    available!: boolean;
    type!: string;
    year!: number;
    options!: string[];
    specs!: string[];
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return "cars";
    }
}

export type Car = ModelObject<CarModel>;