import { BaseRabbitConnection } from "./BaseRabbitConnection";

export class Producer extends BaseRabbitConnection {
  id: string;
  constructor(id: string, exchange: string) {
    super(exchange);

    this.id = id;
  }

  init = async () => {
    await this.attemptInitMq();
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
