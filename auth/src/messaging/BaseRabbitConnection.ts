import amqp, { Connection, Channel } from "amqplib";
import { sleep } from "../utils";

export abstract class BaseRabbitConnection {
  attempts: number;
  queueName: string;
  connection?: Connection;
  channel?: Channel;

  constructor(queueName: string) {
    this.attempts = 0;
    this.queueName = queueName;
  }

  abstract init = async () => {};

  connectMq = async () => {
    this.connection = await amqp.connect({
      protocol: "amqp",
      hostname: "alt-poll-rabbitmq.default.svc.cluster.local",
      port: 5672,
      username: "admin",
      password: "foobar",
    });

    this.channel = await this.connection.createChannel();

    this.channel.assertQueue("hello", { durable: true });
  };

  attemptInitMq = async () => {
    let interval = 1000 * 10;
    let error = null;

    while (this.attempts <= 10) {
      console.log("attempt no", this.attempts);
      this.attempts++;

      await sleep(this.attempts * interval);
      try {
        error = null;
        await this.connectMq();
      } catch (err) {
        error = err;
        console.error(err);
      }
      if (!error) {
        console.log("connection established");
        break;
      }
    }

    if (error) {
      throw new Error("Failed to establish connection");
    } else {
      console.log("ending");
    }
  };
}
