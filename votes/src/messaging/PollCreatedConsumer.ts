import { ConsumeMessage } from "amqplib";
import { Consumer } from "@js-alt-poll/common";

export class PollCreatedConsumer extends Consumer {
  constructor() {
    super("alt-poll-exchange", "poll.created", "votes");
  }

  onMessage = async (msg: ConsumeMessage) => {
    console.log(msg.content.toString());
  };
}
