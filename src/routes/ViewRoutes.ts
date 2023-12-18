import { Router } from 'express';
import type { Routes } from './Routes';
import { ViewController } from '@controllers/ViewController';

export default class ViewRoutes implements Routes {
  private readonly path = '';
  private readonly controller = new ViewController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.controller.landingPage);
    this.router.get(`${this.path}/cars`, this.controller.searchCars);
  }
}
