import { Request, Response, NextFunction } from "express";
import { join } from "path";

export class ViewController {
    public landingPage = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.render(join(__dirname, "..", "views", "landing_page"));
        } catch (e) {
            next(e);
        }
    }

    public searchCars = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.render(join(__dirname, "..", "views", "cari_mobil"));
        } catch (e) {
            next(e);
        }
    }
}