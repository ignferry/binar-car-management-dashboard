import CarRoutes from "routes/CarRoutes";
import { App } from "./App"
import OrderRoutes from "routes/OrderRoutes";
import ViewRoutes from "routes/ViewRoutes";

// Setup environment variables from file
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: ".env" });
}

const app = new App([
    new CarRoutes(),
    new OrderRoutes(),
    new ViewRoutes()
]);

app.listen();