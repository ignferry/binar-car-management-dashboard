import { App } from '../App';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import supertest from 'supertest';
import { join } from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import logger from '@utils/logger';
import OrderRoutes from '@routes/OrderRoutes';

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

describe('Test Get Orders Route: GET /api/v1/orders', () => {
  const mainApp = new App([new OrderRoutes()]);
  const app = mainApp.app;
  const route = '/api/v1/orders';

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

  it('should return orders', async () => {
    const response = await supertest(app)
      .get(route)
      .set('Authorization', `Bearer ${JWT_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),
      user_id: expect.any(String),
      car_id: expect.any(String),
      start_rent: expect.any(String),
      finish_rent: expect.any(String),
      price: expect.any(Number),
      status: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it('should fail with No JWT Token Provided message', async () => {
    const response = await supertest(app).get(route);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: 'No JWT Token Provided',
    });
  });
});
