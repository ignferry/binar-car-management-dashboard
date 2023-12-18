import CarRoutes from 'routes/CarRoutes';
import { App } from './App';
import OrderRoutes from 'routes/OrderRoutes';
import ViewRoutes from 'routes/ViewRoutes';
import AuthRoutes from 'routes/AuthRoutes';

// Setup environment variables from file
if (process.env.NODE_ENV !== 'production') {
  (await import('dotenv')).config({ path: '.env' });
}

const app = new App([
  new CarRoutes(),
  new OrderRoutes(),
  new ViewRoutes(),
  new AuthRoutes(),
]);

app.listen();
