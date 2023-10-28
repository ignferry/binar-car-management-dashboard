import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("plate", 16);
        table.string("name", 256).notNullable();
        table.integer("rent_per_day").notNullable();
        table.integer("capacity");
        table.string("description", 1024);
        table.dateTime("available_at", { useTz: false }).notNullable().defaultTo(knex.fn.now());
        table.string("transmission", 16);
        table.boolean("available").defaultTo(true);
        table.string("type", 16);
        table.integer("year");
        table.string("size_type", 16).notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

