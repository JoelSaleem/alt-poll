#![feature(proc_macro_hygiene, decl_macro)]

use std::{borrow::Borrow, str::FromStr};

use async_global_executor;
use lapin::{
    auth::Credentials,
    options::{
        BasicAckOptions, BasicConsumeOptions, BasicPublishOptions, ExchangeDeclareOptions,
        QueueBindOptions, QueueDeclareOptions,
    },
    publisher_confirm::Confirmation,
    types::FieldTable,
    uri::{AMQPAuthority, AMQPUri, AMQPUserInfo},
    BasicProperties, Connection, ConnectionProperties,
};

#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    async_global_executor::block_on(async {
        let uri = AMQPUri {
            scheme: lapin::uri::AMQPScheme::AMQP,
            authority: AMQPAuthority {
                port: 5672,
                userinfo: AMQPUserInfo {
                    username: String::from("admin"),
                    password: String::from("foobar"),
                },
                host: String::from("alt-poll-rabbitmq.default.svc.cluster.local"),
            },

            // vhost: String::from("alt-poll-rabbitmq.default.svc.cluster.local"),
            ..Default::default()
        };

        let conn = Connection::connect_uri(
            uri,
            ConnectionProperties::default().with_default_executor(8),
        )
        .await
        .unwrap();

        let channel = conn.create_channel().await.unwrap();

        channel
            .exchange_declare(
                "myExchange",
                lapin::ExchangeKind::Topic,
                ExchangeDeclareOptions {
                    durable: true,
                    ..Default::default()
                },
                FieldTable::default(),
            )
            .await
            .unwrap();

        let q = channel
            .queue_declare(
                "rust_client",
                QueueDeclareOptions {
                    exclusive: false,
                    ..Default::default()
                },
                FieldTable::default(),
            )
            .await
            .unwrap();

        let consumer = channel
            .basic_consume(
                "rust_client",
                "user.#",
                BasicConsumeOptions {
                    no_ack: true,
                    ..Default::default()
                },
                FieldTable::default(),
            )
            .await
            .unwrap();

        // async_global_executor::spawn(async move {
        //     println!("Consumer, will consume");
        //     while let (_, delivery) = consumer.into_iter().next().unwrap().unwrap() {
        //         delivery.ack(BasicAckOptions::default()).await.expect("ack");
        //     }
        // })
        // .detach();

        println!("Exchange: {:?}", q);
    });

    "hello world"
    // Connection::connect_uri(, opt;ions)

    // Connection::connector(options)

    // let rabbit_address = "amqp://alt-poll-rabbitmq.default.svc.cluster.local:5672";
    // async_global_executor::block_on(async {
    //     let conn = Connection::connect(
    //         rabbit_address,
    //         ConnectionProperties::default().with_default_executor(8),
    //     )
    //     .await
    //     .unwrap();

    //     println!("connection: {:?}", conn);

    //     let channel = conn.create_channel().await.unwrap();
    //     println!("channel: {:?}", channel);

    //     let queue = channel
    //         .queue_bind(
    //             "myQueue",
    //             "myExchange",
    //             "user.#",
    //             QueueBindOptions::default(),
    //             FieldTable::default(),
    //         )
    //         .await
    //         .unwrap();

    //     let consumer = channel
    //         .basic_consume(
    //             "myQueue",
    //             "my_consumer",
    //             BasicConsumeOptions::default(),
    //             FieldTable::default(),
    //         )
    //         .await
    //         .unwrap();

    //     async_global_executor::spawn(async move {
    //         println!("will consume");

    //         let mut consumer = consumer.into_iter();
    //         while let Some(delivery) = consumer.next() {
    //             let (_, delivery) = delivery.expect("error in consumer");
    //             delivery.ack(BasicAckOptions::default()).await.expect("ack")
    //         }
    //     })
    //     .detach();

    //     let payload = b"Hello world";
    //     loop {
    //         let confirm = channel
    //             .basic_publish(
    //                 "myExchange",
    //                 "user.update",
    //                 BasicPublishOptions::default(),
    //                 payload.to_vec(),
    //                 BasicProperties::default(),
    //             )
    //             .await
    //             .unwrap();

    //         // assert_eq!(confirm, Confirmation::NotRequested);
    //     }
    // });

    // return "Hello test world!";
}

fn main() {
    rocket::ignite().mount("/polls/", routes![index]).launch();
}
