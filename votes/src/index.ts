import express from "express";
import { PollCreatedConsumer } from "./messaging/PollCreatedConsumer";
import { PollUpdatedConsumer } from "./messaging/PollUpdatedConsumer";
import { UserCreatedConsumer } from "./messaging/UserCreatedConsumer";
import { initVoteRoutes } from "./routes/voteRoutes";

const app = express();

new UserCreatedConsumer().init();
new PollCreatedConsumer().init();
new PollUpdatedConsumer().init();

initVoteRoutes(app);

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});
