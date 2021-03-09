import { ConsumeMessage } from "amqplib";
import { Consumer, UserDbProps, UserEvents } from "@js-alt-poll/common";
import { User } from "../db/models/User";

export class UserCreatedConsumer extends Consumer {
  constructor() {
    super("alt-poll-exchange", UserEvents.USER_CREATED, "votes");
  }

  onMessage = async (msg: ConsumeMessage) => {
    const userData: UserDbProps = JSON.parse(msg.content.toString());
    console.log("user", userData);

    const { created_at, google_id, id, name } = userData;

    const user = new User(id, google_id, name, created_at);
    await user.save();
    this.ack(msg);
  };
}
