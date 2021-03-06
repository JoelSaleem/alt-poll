import { ConsumeMessage } from "amqplib";
import { Consumer, OptionDbProps, OptionEvents } from "@js-alt-poll/common";
import { Option } from "../db/models/Option";
import { logger } from "../logger";

export class OptionUpdatedConsumer extends Consumer {
  constructor() {
    super(
      "alt-poll-exchange",
      OptionEvents.OPTION_UPDATED,
      "votes-option-update"
    );
  }

  onMessage = async (msg: ConsumeMessage) => {
    const optionData: OptionDbProps = JSON.parse(msg.content.toString());
    console.log("option creaed consumer received", optionData);
    const {
      id,
      title,
      description,
      poll_id,
      user_id,
      created_at,
      version,
    } = optionData;

    try {
      const option = await Option.getOptionById(id, poll_id, user_id);

      if (!option || option.version != version - 1) {
        throw new Error(
          "Option could not be updated for option " + JSON.stringify(option)
        );
      }
      option.title = title;
      option.description = description;
      option.createdAt = new Date(created_at);
      option.version = version;

      await option.save();
    } catch (e) {
      logger.error(e);
      return this.nack(msg, 30 * 1000);
    }
    this.ack(msg);
  };
}
