import { Producer } from "@js-alt-poll/common";

const optionProducer = new Producer("optionProducer", "alt-poll-exchange");
optionProducer.init();

export { optionProducer };
