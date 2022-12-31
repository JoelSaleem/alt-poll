import { Producer } from "@js-alt-poll/common";

const userProducer = new Producer("userProducer", "alt-poll-exchange");
userProducer.init(
  process.env.RABBIT_HOSTNAME as string,
  process.env.RABBIT_USERNAME as string,
  process.env.RABBIT_PASSWORD as string,
  Number(process.env.RABBIT_PORT)
);


export { userProducer };
