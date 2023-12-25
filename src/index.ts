import CarRoutes from '@routes/CarRoutes';
import { App } from './App';
import OrderRoutes from '@routes/OrderRoutes';
import ViewRoutes from '@routes/ViewRoutes';
import AuthRoutes from '@routes/AuthRoutes';
import { type Routes } from '@routes/Routes';

const routes: Routes[] = [
  new CarRoutes(),
  new OrderRoutes(),
  new ViewRoutes(),
  new AuthRoutes(),
];

const app = new App(routes);

app.listen();
