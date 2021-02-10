import { Producer } from "@js-alt-poll/common";

const userProducer = new Producer("userProducer", "alt-poll-exchange");
userProducer.init();

export { userProducer };
