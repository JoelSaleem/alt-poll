import express from "express";
import { Consumer } from "@js-alt-poll/common";
import { ConsumeMessage } from "amqplib";
import { logger } from "./logger";

class TestConsumer extends Consumer {
  constructor(exchange: string, pattern: string, queueName: string) {
    super(exchange, pattern, queueName);
  }

  onMessage = async (msg: ConsumeMessage) => {
    console.log("msg", msg.content);
  };
}

const a = new TestConsumer("alt-poll-exchange", "user.#", "polls");
a.init();

const app = express();

app.listen(3000, () => {
  logger.info("listening on port 3000");
});
