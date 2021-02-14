import { ConsumeMessage } from "amqplib";
import { Consumer, UserDbProps } from "@js-alt-poll/common";
import { User } from "../db/models/User";
import { logger } from "../logger";

const DEFAULT_RABBIT_NACK_DELAY = 10 * 1000; // 10 secs

export class UserCreatedConsumer extends Consumer {
  constructor() {
    super("alt-poll-exchange", "user.created", "polls");
  }

  onMessage = async (msg: ConsumeMessage) => {
    logger.info("user created msg received", msg.content.toString());
    const userProps = JSON.parse(msg.content.toString()) as UserDbProps;

    logger.info("usr", userProps);
    try {
      const u = new User(
        userProps.id,
        userProps.google_id,
        userProps.name,
        userProps.created_at
      );

      await u.save();
      this.ack(msg);
    } catch (e) {
      logger.error(e);
      this.nack(msg, DEFAULT_RABBIT_NACK_DELAY);
    }
  };
}
