import express from "express";
import { logger } from "./logger";
import { UserCreatedConsumer } from "./messaging/UserCreatedConsumer";

const app = express();

new UserCreatedConsumer().init();

app.listen(3000, () => {
  logger.info("listening on port 3000");
});
