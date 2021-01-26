import amqp, { connect } from "amqplib";

export const connectMq = async () => {
  const ch = await amqp.connect({
    protocol: "amqp",
    hostname: "alt-poll-rabbitmq.default.svc.cluster.local",
    port: 5672,
    username: "admin",
    password: "foobar",
  });

  console.log(ch, "(I guess we connected?)");

  const channel = await ch.createChannel();

  channel.assertQueue("hello", { durable: false });

  channel.sendToQueue("hello", Buffer.from("this is  a test msg"));
};

const sleep = async (interval: number) => {
  return new Promise((resolve) => {
    console.log("will sleep", interval);
    setTimeout(resolve, interval);
  });
};

let attempts = 1;

export const attemptInitMq = async () => {
  let interval = 1000 * 10;
  let error = null;

  while (attempts <= 10) {
    console.log("attempt no", attempts);
    attempts++;

    try {
      error = null
      await connectMq();
    } catch (err) {
      error = err;
      console.error(err);
    }
    if (!error) {
      console.log("connection established");
      break;
    }
    await sleep(attempts * interval);
  }

  console.log("ending");
};
