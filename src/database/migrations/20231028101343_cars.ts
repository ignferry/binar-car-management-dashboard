import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("image", 64).notNullable();
        table.string("plate", 16).notNullable();
        table.string("manufacture", 64).notNullable();
        table.string("model", 64).notNullable();
        table.integer("rent_per_day").notNullable();
        table.integer("capacity").notNullable();
        table.string("description", 512).notNullable();
        table.dateTime("available_at", { useTz: false }).notNullable().defaultTo(knex.fn.now());
        table.string("transmission", 64).notNullable();
        table.boolean("available").defaultTo(true);
        table.string("type", 64).notNullable();
        table.integer("year").notNullable();
        table.specificType("options", "VARCHAR(256)[]");
        table.specificType("specs", "VARCHAR(256)[]");
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

