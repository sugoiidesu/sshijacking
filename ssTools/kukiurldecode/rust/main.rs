extern crate serde_json;
extern crate urlencoding;

use std::env;
use urlencoding::decode;
use serde_json::Value;


fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        println!("Penggunaan: program -u 'name1%5B%5D=val1&name2%5B%5D=val2'");
        return;
    }
    
    if args[1] == "-u" {
        let parameter = &args[2];
        let decoded = decode(parameter).unwrap();
        let pairs: Vec<&str> = decoded.split('&').collect();

        let mut json_obj = serde_json::Map::new();

        for pair in pairs {
            let kv: Vec<&str> = pair.split('=').collect();
            let key = kv[0];
            let value = kv[1];

            if key.ends_with("[]") {
                let key = &key[..key.len() - 2];

                if let Some(values) = json_obj.get_mut(key) {
                    values.as_array_mut().unwrap().push(serde_json::Value::String(value.to_string()));
                }
                else {
                    json_obj.insert(key.to_string(), serde_json::Value::Array(vec![serde_json::Value::String(value.to_string())]));
                }
            }
            else {
                json_obj.insert(key.to_string(), serde_json::Value::String(value.to_string()));
            }
        }

        let json_data = serde_json::to_string(&json_obj).unwrap();
        
        let data: Value = serde_json::from_str(json_data.as_str()).unwrap();

        let nama_array = &data["nama"];
        let isi_array = &data["isi"];

        let mut pairs = Vec::new();

        for (nama, isi) in nama_array.as_array().unwrap().iter().zip(isi_array.as_array().unwrap().iter()) {
            let nama_str = nama.as_str().unwrap();
            let isi_str = isi.as_str().unwrap();

            pairs.push(format!("{}={}", nama_str, isi_str));
        }

        let result = pairs.join(";");

        println!("\n\nyour cookie:\n{}", result);
    } else {
        println!("Argumen tidak valid. Gunakan -u untuk memberikan parameter.");
    }
}