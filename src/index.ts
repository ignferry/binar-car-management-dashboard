import CarRoutes from 'routes/CarRoutes';
import { App } from './App';
import OrderRoutes from 'routes/OrderRoutes';
import ViewRoutes from 'routes/ViewRoutes';
import AuthRoutes from 'routes/AuthRoutes';

// Setup environment variables from file
import('dotenv').then((lib) => {
  lib.config({ path: '.env' });
}).catch(() => {
  console.log("Failed in reading .env file")
});


const app = new App([
  new CarRoutes(),
  new OrderRoutes(),
  new ViewRoutes(),
  new AuthRoutes(),
]);

app.listen();
