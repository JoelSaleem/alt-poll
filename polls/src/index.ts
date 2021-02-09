import express from "express";
import { Consumer } from "@js-alt-poll/common";
import { ConsumeMessage } from "amqplib";

class TestConsumer extends Consumer {
  constructor(exchange: string, pattern: string, queueName: string) {
    super(exchange, pattern, queueName);
  }

  onMessage = async (msg: ConsumeMessage) => {
    console.log("msg", msg);
  };
}

const a = new TestConsumer("myExchange", "user.#", "polls");
a.init();

const app = express();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
