import { App } from '../App';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import supertest from 'supertest';
import logger from '@utils/logger';
import ViewRoutes from '@routes/ViewRoutes';

describe('Test Landing Page: GET /', () => {
  const mainApp = new App([new ViewRoutes()]);
  const app = mainApp.app;
  const route = '';

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

  it('should contain landing page texts', async () => {
    const response = await supertest(app).get(route);

    expect(response.status).toBe(200);
    expect(response.text).contains('Selamat datang di Binar Car Rental.');
    expect(response.text).contains('Sewa Mobil Dengan Supir di Bali 12 Jam');
    expect(response.text).contains('Layanan 24 Jam');
    expect(response.text).contains('Berbagai review positif dari pelanggan kami');
    expect(response.text).contains('Sewa Mobil di Bandung Sekarang');
    expect(response.text).contains('Frequently Asked Question');
  });
});

describe('Test Search Car Page: GET /cars', () => {
    const mainApp = new App([new ViewRoutes()]);
    const app = mainApp.app;
    const route = '/cars';
  
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
  
    it('should contain landing page texts', async () => {
      const response = await supertest(app).get(route);
  
      expect(response.status).toBe(200);
      expect(response.text).contains('Tipe Driver');
      expect(response.text).contains('Tanggal');
      expect(response.text).contains('Waktu Jemput/Ambil');
      expect(response.text).contains('Jumlah Penumpang');
      expect(response.text).contains('Cari Mobil');
    });
  });