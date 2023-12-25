import type { Request, Response, NextFunction } from 'express';
import { join } from 'path';

export class ViewController {
  public landingPage = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render(join(__dirname, '..', '..', 'views', 'landing_page'));
    } catch (e) {
      next(e);
    }
  };

  public searchCars = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render(join(__dirname, '..', '..', 'views', 'cari_mobil'));
    } catch (e) {
      next(e);
    }
  };
}
