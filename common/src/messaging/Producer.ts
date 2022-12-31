import { BaseRabbitConnection } from "./BaseRabbitConnection";

export class Producer extends BaseRabbitConnection {
  id: string;
  constructor(id: string, exchange: string) {
    super(exchange);

    this.id = id;
  }

  init = async (hostname: string, username: string, password: string, port: number) => {
    await this.attemptInitMq(hostname, username, password, port);
  };

  publish = (key: string, msg: string) => {
    if (!this.channel) {
      throw Error(
        `Could not send message, channel does not exist: ${this.exchange}`
      );
    }

    this.channel.publish(this.exchange, key, Buffer.from(msg));
  };
}

