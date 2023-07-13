extern crate serde_json;
extern crate urlencoding;

use std::env;
// use urlencoding::decode;
use urlencoding::decode;
use serde_json::Value;


fn main() {
    // Mendapatkan argument dari terminal
    let args: Vec<String> = env::args().collect();

    // Memeriksa apakah argumen sudah diberikan dengan benar
    if args.len() != 3 {
        println!("Penggunaan: program -u 'name1%5B%5D=val1&name2%5B%5D=val2'");
        return;
    }
    
    // Mendapatkan nilai parameter dari argumen ketiga
    if args[1] == "-u" {
        let parameter = &args[2];

        // Mendecode URL-encoded string
        // let decoded_parameter = decode(parameter).unwrap();
        
        let decoded = decode(parameter).unwrap();

        // Split the decoded data into key-value pairs
        let pairs: Vec<&str> = decoded.split('&').collect();

        // Create a JSON object
        let mut json_obj = serde_json::Map::new();

        for pair in pairs {
            let kv: Vec<&str> = pair.split('=').collect();
            let key = kv[0];
            let value = kv[1];

            // Handle arrays by checking if the key ends with "[]"
            if key.ends_with("[]") {
                let key = &key[..key.len() - 2];

                // If the key already exists, append the value to the array
                if let Some(values) = json_obj.get_mut(key) {
                    values.as_array_mut().unwrap().push(serde_json::Value::String(value.to_string()));
                }
                // Otherwise, create a new array with the value
                else {
                    json_obj.insert(key.to_string(), serde_json::Value::Array(vec![serde_json::Value::String(value.to_string())]));
                }
            }
            // Handle regular key-value pairs
            else {
                json_obj.insert(key.to_string(), serde_json::Value::String(value.to_string()));
            }
        }

        // Serialize the JSON object to a JSON string
        let json_data = serde_json::to_string(&json_obj).unwrap();
        
        let data: Value = serde_json::from_str(json_data.as_str()).unwrap();

          // Retrieve the 'nama' and 'isi' arrays 
        let nama_array = &data["nama"];
        let isi_array = &data["isi"];

        // Create an empty vector to store the key-value pairs
        let mut pairs = Vec::new();

        // Iterate over the arrays and create key-value pairs
        for (nama, isi) in nama_array.as_array().unwrap().iter().zip(isi_array.as_array().unwrap().iter()) {
            let nama_str = nama.as_str().unwrap();
            let isi_str = isi.as_str().unwrap();

            pairs.push(format!("{}={}", nama_str, isi_str));
        }

        // Join the pairs using ';'
        let result = pairs.join(";");

        println!("\n\nyour cookie:\n{}", result);
        // Menampilkan hasil decode
        // println!("\n\nURL-decoded parameter:\n{}", decoded_parameter);
    } else {
        println!("Argumen tidak valid. Gunakan -u untuk memberikan parameter.");
    }
}