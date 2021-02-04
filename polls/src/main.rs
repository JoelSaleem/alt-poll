#![feature(proc_macro_hygiene, decl_macro)]

use messaging_client::Client;

mod messaging_client;

#[macro_use]
extern crate rocket;

// fn main() {
//     // Client::new();
//     println!("{}", "here");
// }

#[get("/")]
fn index() -> &'static str {
    "Hello world"
}

fn main() {
    let mut c = Client::new();
    c.attempt_connection();

    rocket::ignite().mount("/polls/", routes![index]).launch();
}
