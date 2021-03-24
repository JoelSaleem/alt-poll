import { ConsumeMessage } from "amqplib";
import { Consumer, OptionDbProps, OptionEvents } from "@js-alt-poll/common";
import { Option } from "../db/models/Option";
import { logger } from "../logger";

export class OptionCreatedConsumer extends Consumer {
  constructor() {
    super(
      "alt-poll-exchange",
      OptionEvents.OPTION_CREATED,
      "votes-option-created"
    );
  }

  onMessage = async (msg: ConsumeMessage) => {
    const optionData: OptionDbProps = JSON.parse(msg.content.toString());
    console.log("option creaed consumer received", optionData);
    const { id, title, description, poll_id, user_id, created_at } = optionData;

    try {
      await Option.create({
        id,
        title,
        description,
        pollId: poll_id,
        userId: user_id,
        createdAt: new Date(created_at),
      });
    } catch (e) {
      logger.error(e);
      return this.nack(msg, 30 * 1000);
    }
    this.ack(msg);
  };
}
