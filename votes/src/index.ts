import express from "express";
import { PollCreatedConsumer } from "./messaging/PollCreatedConsumer";

const app = express();

new PollCreatedConsumer().init();

app.use("/votes", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});
