import amqp, { ConsumeMessage } from "amqplib";
import { BaseRabbitConnection } from "./BaseRabbitConnection";

export abstract class Consumer extends BaseRabbitConnection {
  queueName: string;
  pattern: string;
  constructor(exchange: string, queueName: string = "", pattern: string) {
    super(exchange);

    this.queueName = queueName;
    this.pattern = pattern;
  }

  init = async () => {
    await this.attemptInitMq();

    await this.setupListner();
  };

  abstract onMessage = async (msg: ConsumeMessage) => {};

  setupListner = async () => {
    console.log(`setting up listner for ${this.exchange}`);
    if (!this.channel) {
      throw new Error("Will no cahannel configured");
    }

    const q = await this.channel.assertQueue(this.queueName, {
      exclusive: false,
    });

    await this.channel.bindQueue(q.queue, this.exchange, this.pattern);

    this.channel.consume(
      q.queue,
      async (msg) => {
        console.log("msg received for " + this.exchange, msg);
        if (msg) {
          await this.onMessage(msg);
        }
      },
      { noAck: false }
    );
  };
}
