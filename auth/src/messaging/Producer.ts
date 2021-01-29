import amqp from "amqplib";
import { BaseRabbitConnection } from "./BaseRabbitConnection";

export class Producer extends BaseRabbitConnection {
  constructor(queueName: string) {
    super(queueName);
  }

  init = async () => {
    await this.attemptInitMq();
  };

  sendMessage = (msg: string) => {
    if (!this.channel) {
      throw Error(
        `Could not send message, channel does not exist: ${this.queueName}`
      );
    }

    this.channel.sendToQueue(this.queueName, Buffer.from(msg), {
      persistent: true,
    });
  };
}
