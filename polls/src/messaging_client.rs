use amiquip::{Connection, ConsumerMessage, ConsumerOptions, QueueDeclareOptions};
use std::thread;
use std::time::Duration;

const MQ_CONNECTION_DELAY: u64 = 10;
pub struct Client {
    attempts: u64,
    connection: Option<Connection>,
}

impl Client {
    pub fn new() -> Client {
        Client {
            attempts: 0,
            connection: None,
        }
    }

    pub fn attempt_connection(&mut self) {
        while self.attempts < 10 {
            println!("will sleep {:?}", self.attempts * MQ_CONNECTION_DELAY);
            thread::sleep(Duration::from_secs((self.attempts * MQ_CONNECTION_DELAY)));

            println!("{:}", self.attempts);
            let mut result = Connection::insecure_open(
                "amqp://admin:foobar@alt-poll-rabbitmq.default.svc.cluster.local",
            );

            let connection = match result {
                Ok(result) => Some(result),
                Err(error) => {
                    println!("{:?}", error);
                    None
                }
            };

            match connection {
                Some(conn) => self.connection = Some(conn),
                None => {}
            }
            self.attempts += 1;
        }

        // println!("Connection {:?}", connection);

        // // Open a channel - None says let the library choose the channel ID.
        // let channel = connection.open_channel(None).unwrap();

        // // Declare the "hello" queue.
        // let queue = channel
        //     .queue_declare("hello", QueueDeclareOptions::default())
        //     .unwrap();

        // // Start a consumer.
        // let consumer = queue.consume(ConsumerOptions::default()).unwrap();
        // println!("Waiting for messages. Press Ctrl-C to exit.");

        // for (i, message) in consumer.receiver().iter().enumerate() {
        //     match message {
        //         ConsumerMessage::Delivery(delivery) => {
        //             let body = String::from_utf8_lossy(&delivery.body);
        //             println!("({:>3}) Received [{}]", i, body);
        //             consumer.ack(delivery).unwrap();
        //         }
        //         other => {
        //             println!("Consumer ended: {:?}", other);
        //             break;
        //         }
        //     }
        // }

        // connection.close().unwrap();
    }
}
