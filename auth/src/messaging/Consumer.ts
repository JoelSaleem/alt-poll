import amqp, { ConsumeMessage } from "amqplib";
import { BaseRabbitConnection } from "./BaseRabbitConnection";

export abstract class Consumer extends BaseRabbitConnection {
  constructor(queueName: string) {
    super(queueName);
  }

  init = async () => {
    await this.attemptInitMq();

    this.setupListner();
  };

  abstract onMessage = async (msg: ConsumeMessage) => {};

  setupListner = () => {
    console.log(`setting up listner for ${this.queueName}`);
    if (!this.channel) {
      throw new Error("Will no cahannel configured");
    }

    this.channel.consume(
      this.queueName,
      async (msg) => {
        if (msg) {
          await this.onMessage(msg);
        }
      },
      { noAck: true }
    );
  };
}
