#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!" 
}

fn main() {
    println!("testing!");
    rocket::ignite().mount("/polls/", routes![index]).launch();
}