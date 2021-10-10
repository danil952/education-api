const packageJson = require("../package.json");

const envFileName =
  process.env.NODE_ENV === "production"
    ? ".env"
    : ".env." + process.env.NODE_ENV;
require("dotenv").config({ path: envFileName });

import App from "./system/App";

export default new App(
  packageJson.name,
  Number(process.env.PORT) || 3000,
  process.env.API_ENDPOINT || "",
  process.env.DATABASE_HOST || "localhost",
  Number(process.env.DATABASE_PORT) || 27017,
  process.env.DATABASE_USER || "",
  process.env.DATABASE_PASSWORD || "",
  process.env.DATABASE_NAME || packageJson.name
).init();
