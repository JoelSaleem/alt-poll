import express from "express";
import { ConsumeMessage } from "amqplib";
import { Consumer } from "@js-alt-poll/common";

class PollCreatedConsumer extends Consumer {
  constructor() {
    super("alt-poll-exchange", "poll.created", "votes");
  }

  onMessage = async (msg: ConsumeMessage) => {
    console.log(msg.content.toString());
  };
}

new PollCreatedConsumer().init();

const app = express();

app.use("/votes", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});
