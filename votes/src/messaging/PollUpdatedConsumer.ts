import { ConsumeMessage } from "amqplib";
import { Consumer, PollDbProps } from "@js-alt-poll/common";
import { Poll } from "../db/models/Poll";
import { version } from "typescript";
import { logger } from "../logger";

export class PollUpdatedConsumer extends Consumer {
  // poll not updating when closed??
  constructor() {
    super("alt-poll-exchange", "poll.updated", "votes-poll-updated");
  }

  onMessage = async (msg: ConsumeMessage) => {
    console.log("poll updated", JSON.parse(msg.content.toString()));
    const {
      id,
      user_id,
      closed,
      description,
      open,
      title,
      version,
    }: PollDbProps = JSON.parse(msg.content.toString());
    console.log("closed", closed);

    const poll = await Poll.getById(id, user_id);
    console.log("existig poll", poll?.serialise(), version);
    if (!poll || poll.version != version - 1) {
      logger.error(`Could not update poll: ${poll}`);
      this.nack(msg, 20 * 1000);
      return;
    }

    poll.title = title;
    poll.description = description;
    poll.open = open;
    poll.closed = closed;
    poll.version = version;

    try {
      const p = await poll?.save();
      console.log("db res", JSON.stringify(p));
    } catch (e) {
      this.nack(msg, 20 * 1000);
    }
  };
}
