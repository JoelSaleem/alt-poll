import { ConsumeMessage } from "amqplib";
import { Consumer, PollDbProps } from "@js-alt-poll/common";
import { Poll } from "../db/models/Poll";

export class PollUpdatedConsumer extends Consumer {
  constructor() {
    super("alt-poll-exchange", "poll.updated", "votes-poll-updated");
  }

  onMessage = async (msg: ConsumeMessage) => {
    console.log("poll updated");
    const {
      id,
      user_id,
      closed,
      description,
      open,
      title,
    }: PollDbProps = JSON.parse(msg.content.toString());

    const poll = await Poll.getPollById(id, user_id);
    if (!poll) {
      this.nack(msg, 20 * 1000);
      return;
    }

    poll.title = title;
    poll.description = description;
    poll.open = open;
    poll.closed = closed;

    try {
      await poll?.save();
    } catch (e) {
      this.nack(msg, 20 * 1000);
    }
  };
}
