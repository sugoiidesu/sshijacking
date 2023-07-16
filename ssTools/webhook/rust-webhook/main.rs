#[macro_use]
extern crate rocket;

use rocket::http::Status;
use rocket::response::status::Custom;
use rocket::serde::json::Json;
use rocket_cors::{AllowedOrigins, CorsOptions, Cors};

#[derive(serde::Deserialize)]
struct WebhookPayload {
    // Definisikan struktur data yang sesuai dengan payload webhook yang diharapkan
    // Misalnya: field "name" dan "message"
    name: String,
    message: String,
}

#[post("/webhook", format = "json", data = "<payload>")]
fn webhook(payload: Json<WebhookPayload>) -> Result<&'static str, Custom<String>> {
    // Lakukan pemrosesan sesuai kebutuhan berdasarkan payload webhook yang diterima
    // Misalnya: mencetak nama dan pesan ke konsol
    println!("Received webhook - Name: {}, Message: {}", payload.name, payload.message);

    // Kirim respons sukses
    Ok("Webhook received.")
}

#[rocket::main]
async fn main() {
    let cors = CorsOptions::default()
        .allowed_origins(AllowedOrigins::all())
        .to_cors()
        .expect("Failed to create CORS");

    rocket::build()
        .mount("/", routes![webhook])
        .attach(cors)
        .launch()
        .await
        .expect("Failed to start Rocket server");
}
