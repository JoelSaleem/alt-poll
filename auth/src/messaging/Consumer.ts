import amqp, { Connection, Channel } from "amqplib";
import { sleep } from "../utils";
import { BaseRabbitConnection } from "./BaseRabbitConnection";

export class Consumer extends BaseRabbitConnection {
  constructor(queueName: string) {
    super(queueName);
  }

  init = async () => {
    await this.attemptInitMq();
    
    this.setupListners();
  };

  setupListners = () => {
    console.log("setting up listners");
    if (!this.channel) {
      throw new Error("Will no cahannel configured");
    }

    this.channel.consume(
      this.queueName,
      (msg) => {
        console.log("message received!", msg);
        console.log("msg content: ", msg?.content.toString());
      },
      { noAck: true }
    );
  };
}
