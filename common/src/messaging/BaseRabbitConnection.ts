import amqp, { Connection, Channel } from "amqplib";
import { sleep } from "../utils";

export abstract class BaseRabbitConnection {
  protected attempts: number;
  protected exchange: string;
  protected connection?: Connection; // TODO: handle errors -- close connections
  protected channel?: Channel;

  constructor(exchange: string) {
    this.attempts = 0;
    this.exchange = exchange;
  }

  abstract init = async (hostname: string, username: string, password: string, port: number) => {};

  protected connectMq = async (hostname: string, username: string, password: string, port: number) => {
    this.connection = await amqp.connect({
      protocol: "amqp",
      hostname, // "alt-poll-rabbitmq.default.svc.cluster.local",
      port, //5672,
      username,// "admin",
      password, //"foobar",
    });

    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchange, "topic", {
      durable: true,
    });
  };

  protected attemptInitMq = async (hostname: string, username: string, password: string, port: number) => {
    let interval = 1000 * 10;
    let error = null;

    while (this.attempts <= 10) {
      console.log("attempt no", this.attempts);
      this.attempts++;

      await sleep(this.attempts * interval);
      try {
        error = null;
        await this.connectMq(hostname, username, password, port);
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
