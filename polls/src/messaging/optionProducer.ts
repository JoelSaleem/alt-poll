import { Producer } from "@js-alt-poll/common";

const optionProducer = new Producer("optionProducer", "alt-poll-exchange");

optionProducer.init(
  process.env.RABBIT_HOSTNAME as string,
  process.env.RABBIT_USERNAME as string,
  process.env.RABBIT_PASSWORD as string,
  Number(process.env.RABBIT_PORT)
);

export { optionProducer };
