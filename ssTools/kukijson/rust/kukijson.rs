use std::env;
use std::fs;
use serde_json::{self, Value};

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 || args[1] != "-f" {
        println!("Penggunaan: cargo run -- -f <nama_file.json>");
        return;
    }

    let filename = &args[2];

    let json_data = match fs::read_to_string(filename) {
        Ok(data) => data,
        Err(_) => {
            println!("Gagal membaca file: {}", filename);
            return;
        }
    };

    let data: Value = match serde_json::from_str(&json_data) {
        Ok(value) => value,
        Err(_) => {
            println!("Gagal memparse JSON");
            return;
        }
    };

    let formatted_data = format_data(&data);
    println!("{}", formatted_data);
}

fn format_data(data: &Value) -> String {
    let nama_array = &data["nama"];
    let isi_array = &data["isi"];

    if let (Some(nama), Some(isi)) = (nama_array.as_array(), isi_array.as_array()) {
        if nama.len() == isi.len() {
            let formatted_entries: Vec<String> = nama.iter().zip(isi.iter())
                .map(|(nama, isi)| format!("{}={}", nama, isi))
                .collect();
            let formatted_string = formatted_entries.join(";");
            return formatted_string.replace("\"", ""); 
        }
    }

    String::new()
}
