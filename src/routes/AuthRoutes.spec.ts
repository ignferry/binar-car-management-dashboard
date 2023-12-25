import { App } from '../App';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import AuthRoutes from './AuthRoutes';
import supertest from 'supertest';
import logger from '@utils/logger';

describe('Test Auth Registration Routes: /api/v1/auth/register', () => {
  const mainApp = new App([
    new AuthRoutes(),
  ]);
  const app = mainApp.app;
  const route = '/api/v1/auth/register';

  beforeAll(() => {
    const loggingFunctions: Array<"info" | "warn" | "error"> = ['info', 'warn', 'error'];

    for (const fn of loggingFunctions) {
      const spy = vi.spyOn(logger, fn);
      spy.mockImplementation(() => {});
    }
  })

  it('should return successful registration message on non conflicting credentials', async () => {
    const response = await supertest(app).post(route)
      .send({
        email: 'adminx@gmail.com',
        password: 'password'
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'Registration successful'
    });
  });

  it('should fail with bad request on incomplete request body', async () => {
    const response = await supertest(app).post(route)
      .send({
        password: 'password'
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Bad Request'
    });
  });

  it('should fail with constraint violation on conflicting credentials', async () => {
    const response = await supertest(app).post(route)
      .send({
        email: 'admin@gmail.com',
        password: 'password'
      });

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      success: false,
      message: 'Constraint Violation Error'
    });
  });
});

