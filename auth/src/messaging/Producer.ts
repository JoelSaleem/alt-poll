import amqp, { Connection, Channel } from "amqplib";
import { sleep } from "../utils";
import { BaseRabbitConnection } from "./BaseRabbitConnection";

export class Producer extends BaseRabbitConnection {
  constructor(queueName: string) {
    super(queueName);
  }

  init = async () => {
    await this.attemptInitMq();

    this.sendMessage();
  };

  sendMessage = () => {
    if (!this.channel) {
      throw Error(
        `Could not send message, channel does not exist: ${this.queueName}`
      );
    }

    this.channel.sendToQueue(
      this.queueName,
      Buffer.from("this is  a test msg")
    );
  };
}
