import { ConsumeMessage } from "amqplib";
import { Consumer, PollDbProps } from "@js-alt-poll/common";
import { Poll } from "../db/models/Poll";

export class PollCreatedConsumer extends Consumer {
  constructor() {
    super("alt-poll-exchange", "poll.created", "votes");
  }

  onMessage = async (msg: ConsumeMessage) => {
    const pollData: PollDbProps = JSON.parse(msg.content.toString());
    console.log("received poll data", pollData);

    const poll = await Poll.create(
      pollData.id,
      pollData.title,
      pollData.description,
      pollData.user_id,
      pollData.open,
      pollData.closed,
      pollData.created_at
    );
    console.log("created poll", poll);
    this.ack(msg);
  };
}
