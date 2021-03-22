import { ConsumeMessage } from "amqplib";
import { Consumer } from "@js-alt-poll/common";

export class OptionCreatedConsumer extends Consumer {
  constructor() {
    super("alt-poll-exchange", "option.created", "votes-option-created");
  }

  onMessage = async (msg: ConsumeMessage) => {
    this.ack(msg);
  };
}
