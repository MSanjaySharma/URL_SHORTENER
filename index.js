require("dotenv").config();

const express = require("express");
const app = express();
const port = 7013;
const helmet = require("helmet");
const useragent = require("express-useragent");

const configureDB = require("./config/database");
const { configureRedis } = require("./config/redis");

(async () => {
  configureDB();
  configureRedis();

  app.use(helmet());
  app.use(express.json());
  app.use(useragent.express());

  const routes = require("./config/routes");
  app.use("/", routes);

  app.listen(port, () => {
    console.log("listening on port", port);
  });
})();
