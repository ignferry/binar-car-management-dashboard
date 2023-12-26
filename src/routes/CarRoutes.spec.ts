import { App } from '../App';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import supertest from 'supertest';
import { join } from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import logger from '@utils/logger';
import CarRoutes from '@routes/CarRoutes';

const JWT_PRIVATE_KEY: Buffer = fs.readFileSync(
  join(__dirname, '..', '..', 'keys', 'jwt_private.key'),
);

const JWT_TOKEN = jwt.sign(
  {
    id: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d',
    email: 'admin@gmail.com',
  },
  JWT_PRIVATE_KEY,
  {
    expiresIn: '8h',
    algorithm: 'RS256',
  },
);

describe('Test Get Cars Route: GET /api/v1/cars', () => {
  const mainApp = new App([new CarRoutes()]);
  const app = mainApp.app;
  const route = '/api/v1/cars';

  beforeAll(() => {
    const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
      'info',
      'warn',
      'error',
    ];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }
  });

  it('should return 5 cars', async () => {
    const response = await supertest(app).get(route).query({
      page: 1,
      limit: 5,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      page: 1,
      limit: 5,
      data: expect.any(Array),
    });
    expect(response.body.data).toHaveLength(5);
    expect(response.body.data[0]).toMatchObject({
      plate: expect.any(String),
      manufacture: expect.any(String),
      model: expect.any(String),
      image: expect.any(String),
      rent_per_day: expect.any(Number),
      capacity: expect.any(Number),
      description: expect.any(String),
      available_at: expect.any(String),
      transmission: expect.any(String),
      available: expect.any(Boolean),
      type: expect.any(String),
      year: expect.any(Number),
      options: expect.any(Array),
      specs: expect.any(Array),
      created_at: expect.any(String),
      creator_id: expect.any(String),
      id: expect.any(String),
      last_updater_id: expect.any(String),
      updated_at: expect.any(String),
      deleted_at: null,
      deleter_id: null
    });
  });

  it('should return no cars when given a large page value', async () => {
    const response = await supertest(app).get(route).query({
      page: 100,
      limit: 5,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      page: 100,
      limit: 5,
      data: [],
    });
  });

  it('should return cars with capacity of at least 3', async () => {
    const response = await supertest(app).get(route).query({
      page: 1,
      limit: 5,
      min_capacity: 3,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      page: 1,
      limit: 5,
      data: expect.any(Array),
    });

    for (let i = 0; i < response.body.data.length; i++) {
      expect(response.body.data[i].capacity).toBeGreaterThanOrEqual(3);
    }
  });

  it('should return cars with availableAt earlier than 2022-04-01', async () => {
    const response = await supertest(app).get(route).query({
      page: 1,
      limit: 5,
      pickup_time: '2022-04-01T15:49:05.563Z',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      page: 1,
      limit: 5,
      data: expect.any(Array),
    });

    for (let i = 0; i < response.body.data.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(new Date(response.body.data[i].available_at).getTime())
        .toBeLessThan(new Date('2022-04-01T15:49:05.563Z').getTime());
    }
  });

  it('should return cars with availableAt earlier than 2022-03-01 (expected none)', async () => {
    const response = await supertest(app).get(route).query({
      page: 1,
      limit: 5,
      pickup_time: '2022-03-01T15:49:05.563Z',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      page: 1,
      limit: 5,
      data: expect.any(Array),
    });
    expect(response.body.data).toHaveLength(0);
  });

  it('should return cars with size type "small" (capacity 1-2)', async () => {
    const response = await supertest(app).get(route).query({
      page: 1,
      limit: 100,
      size_type: 'small',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      page: 1,
      limit: 100,
      data: expect.any(Array),
    });

    for (let i = 0; i < response.body.data.length; i++) {
      expect(response.body.data[i].capacity).toBeLessThanOrEqual(2);
    }
  });

  it('should return cars with size type "medium" (capacity 3-4)', async () => {
    const response = await supertest(app).get(route).query({
      page: 1,
      limit: 100,
      size_type: 'medium',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      page: 1,
      limit: 100,
      data: expect.any(Array),
    });

    for (let i = 0; i < response.body.data.length; i++) {
      expect(response.body.data[i].capacity).toBeGreaterThanOrEqual(3);
      expect(response.body.data[i].capacity).toBeLessThanOrEqual(4);
    }
  });

  it('should return cars with size type "large" (capacity >= 5)', async () => {
    const response = await supertest(app).get(route).query({
      page: 1,
      limit: 100,
      size_type: 'large',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      page: 1,
      limit: 100,
      data: expect.any(Array),
    });

    for (let i = 0; i < response.body.data.length; i++) {
      expect(response.body.data[i].capacity).toBeGreaterThanOrEqual(5);
    }
  });
});

describe('Test Get Car By ID Route: GET /api/v1/cars/{id}', () => {
  const mainApp = new App([new CarRoutes()]);
  const app = mainApp.app;
  const route = `/api/v1/cars`;

  beforeAll(() => {
    const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
      'info',
      'warn',
      'error',
    ];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }
  });

  it('should return car data with the corresponding existing ID', async () => {
    const carData = {
      id: '6e2bc663-5197-441a-957b-bc75e4a2da7c',
      plate: 'DBH-3491',
      manufacture: 'Ford',
      model: 'F150',
      image: 'car01.min.jpg',
      rent_per_day: 200000,
      capacity: 2,
      description:
        ' Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.',
      available_at: '2022-03-23T08:49:05.563Z',
      transmission: 'Automatic',
      available: true,
      type: 'Sedan',
      year: 2022,
      options: [
        'Cruise Control',
        'Tinted Glass',
        'Tinted Glass',
        'Tinted Glass',
        'AM/FM Stereo',
      ],
      specs: [
        'Brake assist',
        'Leather-wrapped shift knob',
        'Glove box lamp',
        'Air conditioning w/in-cabin microfilter',
        'Body color folding remote-controlled pwr mirrors',
        'Dual-stage front airbags w/occupant classification system',
      ],
      creator_id: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d',
      last_updater_id: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d',
      created_at: expect.any(String),
      updated_at: expect.any(String),
    };

    const response = await supertest(app).get(route + '/' + carData.id);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(carData);
  });

  it('should fail with not found error if car with corresponding ID does not exist', async () => {
    const response = await supertest(app).get(
      route + '/6e2bc663-5197-441b-957b-bc75e4a2da7f',
    );

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Not Found',
    });
  });
});

describe('Test Create Car Route: POST /api/v1/cars', () => {
  const mainApp = new App([new CarRoutes()]);
  const app = mainApp.app;
  const route = `/api/v1/cars`;

  const newCarBody = {
    plate: 'STL-7347',
    manufacture: 'Buick',
    model: 'LaCrosse',
    image: 'car09.min.jpg',
    rent_per_day: 1000000,
    capacity: 6,
    description:
      'Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.',
    available_at: '2022-03-23T15:49:05.563+07:00',
    transmission: 'Automatic',
    available: false,
    type: 'Extended Cab Pickup',
    year: 2012,
    options: ['CD (Multi Disc)'],
    specs: ['Rear reading & courtesy lamps'],
  };

  beforeAll(() => {
    const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
      'info',
      'warn',
      'error',
    ];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }
  });

  it('should successfully create car and return its data', async () => {
    const response = await supertest(app)
      .post(route)
      .set('Authorization', `Bearer ${JWT_TOKEN}`)
      .send(newCarBody);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...newCarBody,
      id: expect.any(String),
      creator_id: expect.any(String),
      created_at: expect.any(String),
      last_updater_id: expect.any(String),
      updated_at: expect.any(String),
      deleter_id: null,
      deleted_at: null,
      available_at: '2022-03-23T08:49:05.563Z',
    });
  });

  it('should fail with bad request error on improper request body', async () => {
    const response = await supertest(app)
      .post(route)
      .set('Authorization', `Bearer ${JWT_TOKEN}`)
      .send({
        ...newCarBody,
        random_attribute: 'random',
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Bad Request',
    });
  });

  it('should fail with No JWT Token Provided message', async () => {
    const response = await supertest(app)
      .post(route)
      .send({
        ...newCarBody,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: 'No JWT Token Provided',
    });
  });

  it('should fail with invalid JWT Token message', async () => {
    const response = await supertest(app)
      .post(route)
      .set('Authorization', `Bearer INVALID_TOKEN`)
      .send({
        ...newCarBody,
        random_attribute: 'random',
      });

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Invalid JWT Token',
    });
  });
});

describe('Test Upload Image Routes: POST /api/v1/cars/image', () => {
  const mainApp = new App([new CarRoutes()]);
  const app = mainApp.app;
  const route = `/api/v1/cars/image`;

  beforeAll(() => {
    const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
      'info',
      'warn',
      'error',
    ];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }
  });

  it('should successfully upload image', async () => {
    const imageBuffer: Buffer = fs.readFileSync(join(__dirname, '..', '..', 'storage', 'cars', 'car01.min.jpg'));
    const response = await supertest(app)
      .post(route)
      .set('Authorization', `Bearer ${JWT_TOKEN}`)
      .attach('image', imageBuffer, 'image.jpg');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      filename: expect.any(String)  
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fs.unlinkSync(join(__dirname, '..', '..', 'storage', 'cars', response.body.filename))
  });

  it('should fail to upload non image file', async () => {
    const fileBuffer: Buffer = fs.readFileSync(join(__dirname, 'CarRoutes.ts'));
    const response = await supertest(app)
      .post(route)
      .set('Authorization', `Bearer ${JWT_TOKEN}`)
      .attach('image', fileBuffer, 'file.ts');

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Bad Request'
    });
  });

  it('should fail on empty request', async () => {
    const response = await supertest(app)
      .post(route)
      .set('Authorization', `Bearer ${JWT_TOKEN}`)

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Bad Request'
    });
  });

  it('should fail with No JWT Token Provided message', async () => {
    const imageBuffer: Buffer = fs.readFileSync(join(__dirname, '..', '..', 'storage', 'cars', 'car01.min.jpg'));
    const response = await supertest(app)
      .post(route)
      .attach('image', imageBuffer, 'image.jpg');

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: 'No JWT Token Provided'
    });
  });
})

describe('Test Update Car Route: PUT /api/v1/cars/{id}', () => {
  const mainApp = new App([new CarRoutes()]);
  const app = mainApp.app;
  const route = `/api/v1/cars`;

  const id = '9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77';

  const updatedCarBody = {
    plate: 'STL-7347',
    manufacture: 'Buick',
    model: 'LaCrosse',
    image: 'car09.min.jpg',
    rent_per_day: 1000000,
    capacity: 6,
    description:
      'Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.',
    available_at: '2022-03-23T15:49:05.563+07:00',
    transmission: 'Automatic',
    available: false,
    type: 'Extended Cab Pickup',
    year: 2012,
    options: ['CD (Multi Disc)'],
    specs: ['Rear reading & courtesy lamps'],
  };

  beforeAll(() => {
    const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
      'info',
      'warn',
      'error',
    ];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }
  });

  it('should successfully update car and return its data', async () => {
    const response = await supertest(app)
      .put(route + '/' + id)
      .set('Authorization', `Bearer ${JWT_TOKEN}`)
      .send(updatedCarBody);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ...updatedCarBody,
      id,
      available_at: '2022-03-23T08:49:05.563Z',
    });
  });

  it('should fail with bad request error on improper request body', async () => {
    const response = await supertest(app)
      .put(route + '/' + id)
      .set('Authorization', `Bearer ${JWT_TOKEN}`)
      .send({
        ...updatedCarBody,
        random_attribute_1: 'random',
        random_attribute_2: 'random',
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Bad Request',
    });
  });

  it('should fail with No JWT Token Provided message', async () => {
    const response = await supertest(app)
      .put(route + '/' + id)
      .send({
        ...updatedCarBody,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: 'No JWT Token Provided',
    });
  });

  it('should fail with not found error when car with corresponding ID does not exist', async () => {
    const response = await supertest(app)
      .put(route + '/6e2bc663-5197-441b-957b-bc75e4a2da7f')
      .set('Authorization', `Bearer ${JWT_TOKEN}`)
      .send(updatedCarBody);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Not Found',
    });
  });
});

describe('Test Delete Car Route: DELETE /api/v1/cars/{id}', () => {
  const mainApp = new App([new CarRoutes()]);
  const app = mainApp.app;
  const route = `/api/v1/cars`;

  const deletedCar = {
    id: 'bf6b5c43-1377-4ae0-8908-310c64266f81',
    plate: 'OSL-4224',
    manufacture: 'Lincoln',
    model: 'MKZ',
    image: 'car03.min.jpg',
    rent_per_day: 900000,
    capacity: 6,
    description:
      ' Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.',
    available_at: '2022-03-23T15:49:05.563Z',
    transmission: 'Automanual',
    available: true,
    type: 'Sedan',
    year: 2021,
    options: [
      'Bucket Seats',
      'Airbag: Passenger',
      'Airbag: Driver',
      'Power Seats',
      'Airbag: Side',
      'Antilock Brakes',
      'CD (Multi Disc)',
    ],
    specs: [
      'Driver & front passenger map pockets',
      'Direct-type tire pressure monitor system',
      'Cargo area lamp',
      'Glove box lamp',
      'Silver finish interior door handles',
      'Driver & front passenger advanced multistage airbags w/occupant sensors',
      'Silver accent IP trim finisher -inc: silver shifter finisher',
      'Fasten seat belt warning light/chime',
    ],
    creator_id: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d',
    last_updater_id: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d',
  };

  beforeAll(() => {
    const loggingFunctions: Array<'info' | 'warn' | 'error'> = [
      'info',
      'warn',
      'error',
    ];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }
  });

  it('should successfully delete car and return its data', async () => {
    const response = await supertest(app)
      .delete(route + '/' + deletedCar.id)
      .set('Authorization', `Bearer ${JWT_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ...deletedCar,
      available_at: '2022-03-23T08:49:05.563Z',
    });
  });

  it('should fail with No JWT Token Provided message', async () => {
    const response = await supertest(app).delete(route + '/' + deletedCar.id);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: 'No JWT Token Provided',
    });
  });

  it('should fail with not found error when car with corresponding ID does not exist', async () => {
    const response = await supertest(app)
      .delete(route + '/6e2bc663-5197-441b-957b-bc75e4a2da7f')
      .set('Authorization', `Bearer ${JWT_TOKEN}`);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Not Found',
    });
  });
});
