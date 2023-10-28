import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        {
            id: "94788d83-60ab-45b2-add0-006613e6c01b",
            name: "Suzuki Karimun",
            rent_per_day: 150000,
            capacity: 2,
            description: "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
            available_at: new Date(2023, 5, 5),
            transmission: "Automatic",
            type: "Minivan",
            year: 2015,
            size_type: "small"
        },
        {
            id: "8d510508-4c4a-4add-a5a6-6af75b5918f2",
            name: "Toyota Camry",
            rent_per_day: 300000,
            capacity: 4,
            description: "Silver finish interior door handles. 160-amp alternator. Tire pressure monitoring system (TPMS). Cloth covered headliner.",
            available_at: new Date(2023, 6, 5),
            transmission: "Automatic",
            type: "Sedan",
            year: 2020,
            size_type: "medium"
        },
        {
            id: "f94f0eee-eca9-4985-bd92-26e00749c035",
            name: "Mazda RX-8",
            rent_per_day: 1000000,
            capacity: 4,
            description: "XM satellite radio receiver -inc: 90 day trial subscription. Dual front illuminated visor vanity mirrors.",
            available_at: new Date(2023, 7, 5),
            transmission: "Automatic",
            type: "Sedan",
            year: 2022,
            size_type: "medium"
        },
        {
            id: "440a8d01-90dc-4ee3-bf06-d0bcbcbfad1d",
            name: "Toyota Land Cruiser",
            rent_per_day: 1300000,
            capacity: 8,
            available_at: new Date(2023, 11, 5),
            description: "Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.",
            transmission: "Automatic",
            type: "Hatchback",
            year: 2020,
            size_type: "large"
        },
        {
            id: "24105b02-6a95-4a0c-bdc8-fa4b4cb7857b",
            name: "Toyota Avanza",
            rent_per_day: 700000,
            capacity: 6,
            available_at: new Date(2023, 3, 5),
            description: "Cargo compartment lamp. Body color fascias w/bright insert. Front/rear stabilizer bars.",
            transmission: "Automatic",
            type: "Minivan",
            year: 2021,
            size_type: "large"
        },
    ]);
}
