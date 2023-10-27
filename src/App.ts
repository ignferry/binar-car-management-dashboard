import express from "express";
import logger from "@utils/logger";

export class App {
    private app: express.Application;
    private port: number;

    constructor() {
        this.port = parseInt(<string>process.env.SERVER_PORT, 10) || 3000;
        this.app = express();
    
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server is running at port ${this.port}`);
        });
    }
}