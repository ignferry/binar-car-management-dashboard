import express from 'express';
import logger from '@utils/logger';
import type { Routes } from 'routes/Routes';
import knex, { type Knex } from 'knex';
import { Model } from 'objection';
import { exceptionHandler } from '@middlewares/ExceptionHandler';
import { reqEndLogger, reqStartLogger } from '@middlewares/LoggingMiddleware';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@utils/GenerateDocs';
import cors from 'cors';

export class App {
  private readonly app: express.Application;
  private readonly knexInstance: Knex;
  private readonly port: number;

  constructor(routes: Routes[]) {
    this.port = parseInt(!process.env.SERVER_POR as unknown as string, 10) || 3000;
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.set('view engine', 'ejs');
    this.app.use(cors());

    // Logs start of request
    this.app.use(reqStartLogger);

    // Initialize routes
    // Documentation route
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Static routes
    this.app.use(
      '/cars/image',
      express.static(join(__dirname, '..', 'storage', 'cars')),
    );
    this.app.use('/', express.static(join(__dirname, '..', 'public')));

    // Main routes
    this.initializeRoutes(routes);

    // Handles request errors
    this.app.use(exceptionHandler);
    // Logs end of request
    this.app.use(reqEndLogger);

    // Setup knex
    this.knexInstance = knex({
      client: 'postgresql',
      connection: {
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT as unknown as string, 10) || 5432,
      },
      pool: {
        min: 2,
        max: 10,
      },
    });

    Model.knex(this.knexInstance);
  }

  private initializeRoutes(routes: Routes[]): void {
    for (const route of routes) {
      this.app.use('/', route.router);
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server is running at port ${this.port}`);
    });
  }
}
