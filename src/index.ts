import { App } from "./App"

// Setup environment variables from file
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: ".env" });
}

const app = new App();

app.listen();