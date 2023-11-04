import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        {
            id: "94788d83-60ab-45b2-add0-006613e6c01b",
            plate: "B 1562 KAS",
            manufacture: "Suzuki",
            model: "Karimun",
            image: "bf36c238-ad45-4799-bef9-5d12e89bb9fa.jpg",
            rent_per_day: 150000,
            capacity: 2,
            description: "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
            available_at: new Date(2023, 5, 5),
            transmission: "Automatic",
            type: "Minivan",
            year: 2015,
            options: [
                "CD (Multi Disc)",
                "Keyless Entry",
                "Cassette Player",
                "Power Windows",
                "Rear Window Wiper",
                "CD (Single Disc)",
                "Third Row Seats"
            ],
            specs: [
                "Rear reading & courtesy lamps",
                "Zone body construction -inc: front/rear crumple zones, hood deformation point",
                "4-wheel/4-channel anti-lock brake system (ABS)",
                "Anti-lock 4-wheel performance disc brakes",
                "200mm front axle",
                "Dual front knee airbags"
            ]
        },
        {
            id: "8d510508-4c4a-4add-a5a6-6af75b5918f2",
            plate: "B 5625 AO",
            manufacture: "Toyota",
            model: "Camry",
            image: "1fa5358e-7df8-4726-a272-1058ef3c1909.jpg",
            rent_per_day: 300000,
            capacity: 4,
            description: "Silver finish interior door handles. 160-amp alternator. Tire pressure monitoring system (TPMS). Cloth covered headliner.",
            available_at: new Date(2023, 6, 5),
            transmission: "Automatic",
            type: "Sedan",
            year: 2020,
            options: [
                "Third Row Seats",
                "Bucket Seats",
                "Integrated Phone",
                "Navigation",
                "Leather Interior"
            ],
            specs: [
                "Cargo compartment lamp",
                "Body color fascias w/bright insert",
                "Front/rear stabilizer bars",
                "Electrochromic pwr folding heated mirrors w/memory -inc: puddle lamps, integrated turn signals, auto reverse tilt-down",
                "Multi-info display -inc: driving range, average MPG, current MPG, average speed, outside temp, elapsed time, maintenance & diagnostic messages"
            ]
        },
        {
            id: "f94f0eee-eca9-4985-bd92-26e00749c035",
            plate: "B 5125 AD",
            manufacture: "Mazda",
            model: "RX-8",
            image: "ff931636-f7de-4165-9dcf-a4a6a3d6a93b.jpg",
            rent_per_day: 1000000,
            capacity: 4,
            description: "XM satellite radio receiver -inc: 90 day trial subscription. Dual front illuminated visor vanity mirrors.",
            available_at: new Date(2023, 7, 5),
            transmission: "Automatic",
            type: "Sedan",
            year: 2022,
            options: [
                "Alloy Wheels",
                "Power Windows",
                "Alloy Wheels",
                "Alloy Wheels",
                "Alarm",
                "Bucket Seats",
                "Bucket Seats"
            ],
            specs: [
                "Cloth covered headliner",
                "Sentry Key theft deterrent system",
                "Air conditioning w/in-cabin microfilter",
                "Driver & front passenger map pockets",
                "Security alarm",
                "Dual bright exhaust tips",
                "Compact spare tire"
            ]
        },
        {
            id: "440a8d01-90dc-4ee3-bf06-d0bcbcbfad1d",
            plate: "B 9125 OS",
            manufacture: "Toyota",
            model: "Land Cruiser",
            image: "2a0d7752-a39a-41df-95b4-f8ede250ca79.jpg",
            rent_per_day: 1300000,
            capacity: 8,
            available_at: new Date(2023, 11, 5),
            description: "Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.",
            transmission: "Automatic",
            type: "Hatchback",
            year: 2020,
            options: [
                "Premium Sound",
                "Fog Lights",
                "Premium Sound",
                "Airbag: Side",
                "Power Seats",
                "Power Steering",
                "Airbag: Driver",
                "Power Steering",
                "Alarm"
            ],
            specs: [
                "Multi-reflector halogen headlamps",
                "Speed control",
                "Anti-lock brake system (ABS) -inc: electronic brake force distribution (EBD), brake assist",
                "Laminated side window glass",
                "Acoustic glass windshield",
                "Back-up camera",
                "Direct-type tire pressure monitor system",
                "All-position 3-point seat belts -inc: outboard pretensioners & force limiters, dual front pwr shoulder height adjusters, rear outboard emergency auto locking retractors, driver emergency locking retractor"
            ]
        },
        {
            id: "24105b02-6a95-4a0c-bdc8-fa4b4cb7857b",
            plate: "B 1295 US",
            manufacture: "Toyota",
            model: "Avanza",
            image: "15f4883f-a758-40be-99e6-697034bb7d6f.jpg",
            rent_per_day: 700000,
            capacity: 6,
            available_at: new Date(2023, 3, 5),
            description: "Cargo compartment lamp. Body color fascias w/bright insert. Front/rear stabilizer bars.",
            transmission: "Automatic",
            type: "Minivan",
            year: 2021,
            options: [
                "Memory Seats",
                "Cassette Player",
                "Alarm",
                "Power Steering",
                "Keyless Entry"
            ],
            specs: [
                "Leather-wrapped shift knob",
                "Dual front illuminated visor vanity mirrors",
                "Battery saver",
                "Driver & front passenger map pockets",
                "Deluxe insulation group"
            ]
        },
    ]);
}
