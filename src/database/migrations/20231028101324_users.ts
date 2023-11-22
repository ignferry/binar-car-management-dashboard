import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("email", 320).notNullable().unique();
        table.text("password").notNullable();
        table.boolean("is_admin").notNullable().defaultTo(true);
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

