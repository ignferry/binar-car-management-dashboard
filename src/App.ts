import express from "express";
import logger from "@utils/logger";
import { Routes } from "routes/Routes";
import knex, { Knex } from "knex";
import { Model } from "objection";
import { exceptionHandler } from "@middlewares/ExceptionHandler";
import { reqEndLogger, reqStartLogger } from "@middlewares/LoggingMiddleware";
import { join } from "path"

export class App {
    private app: express.Application;
    private knexInstance: Knex;
    private port: number;

    constructor(routes: Routes[]) {
        this.port = parseInt(<string>process.env.SERVER_PORT, 10) || 3000;
        this.app = express();

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.set("view engine", "ejs");

        // Logs start of request
        this.app.use(reqStartLogger);

        // Initialize routes
        // Static routes
        this.app.use("/cars/image", express.static(join(__dirname, "..", "storage", "cars")));
        this.app.use("/", express.static(join(__dirname, "..", "public")));
        
        this.initializeRoutes(routes);

        // Handles request errors
        this.app.use(exceptionHandler);
        // Logs end of request
        this.app.use(reqEndLogger);

        // Setup knex
        this.knexInstance = knex({
            client: "postgresql",
            connection: {
              database: process.env.POSTGRES_DB,
              user: process.env.POSTGRES_USER,
              password: process.env.POSTGRES_PASSWORD,
              host: process.env.POSTGRES_HOST,
              port: parseInt(<string>process.env.POSTGRES_PORT, 10) || 5432
            },
            pool: {
              min: 2,
              max: 10,
            }
        });

        Model.knex(this.knexInstance);
    }

    private initializeRoutes(routes: Routes[]) {
        for (let route of routes) {
            this.app.use("/", route.router);
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server is running at port ${this.port}`);
        });
    }
}