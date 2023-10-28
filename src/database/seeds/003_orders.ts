import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("orders").del();

    // Inserts seed entries
    await knex("orders").insert([
        {
            id: "5e649a79-4d62-4d2f-9c36-f41dc9c2e2ba",
            user_id: "2741babd-7c11-4bf3-806b-c1d08d58f6ef",
            car_id: "94788d83-60ab-45b2-add0-006613e6c01b",
            start_rent: new Date(2023, 2, 1),
            finish_rent: new Date(2023, 2, 4),
            price: 450000,
            status: "Selesai"
        },
        {
            id: "7c8124af-6c0e-4d80-9a98-c7f287be0a6f",
            user_id: "878322f2-e61a-484e-b077-05f35f8051a8",
            car_id: "8d510508-4c4a-4add-a5a6-6af75b5918f2",
            start_rent: new Date(2023, 4, 11),
            finish_rent: new Date(2023, 4, 13),
            price: 600000,
            status: "Selesai"
        },
        {
            id: "bd13c09a-ea6b-4300-9be8-0c140ace209a",
            user_id: "2741babd-7c11-4bf3-806b-c1d08d58f6ef",
            car_id: "f94f0eee-eca9-4985-bd92-26e00749c035",
            start_rent: new Date(2023, 7, 15),
            finish_rent: new Date(2023, 7, 16),
            price: 1000000,
            status: "Selesai"
        },
        {
            id: "14958976-ccca-4512-a2e6-0a1ad5d52563",
            user_id: "878322f2-e61a-484e-b077-05f35f8051a8",
            car_id: "440a8d01-90dc-4ee3-bf06-d0bcbcbfad1d",
            start_rent: new Date(2023, 11, 3),
            finish_rent: new Date(2023, 11, 7),
            price: 5200000,
            status: "Ongoing"
        }
    ]);
}
