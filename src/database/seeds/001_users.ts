import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: "0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d",
            email: "admin@gmail.com",
            password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // password
            is_admin: true
        },
        {
            id: "2741babd-7c11-4bf3-806b-c1d08d58f6ef",
            email: "user1@gmail.com",
            password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            is_admin: false
        },
        {
            id: "878322f2-e61a-484e-b077-05f35f8051a8",
            email: "user2@gmail.com",
            password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            is_admin: false
        }
    ]);
}
