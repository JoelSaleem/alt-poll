import { Producer } from "@js-alt-poll/common";

const pollProducer = new Producer("pollProducer", "alt-poll-exchange");
pollProducer.init();

export { pollProducer };
