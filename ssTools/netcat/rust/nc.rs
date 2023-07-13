use std::io::Read;
use std::net::{TcpListener, TcpStream};

fn handle_connection(mut stream: TcpStream) {
    println!("Menerima koneksi dari {}", stream.peer_addr().unwrap());

    let mut buffer = [0; 1024];
    loop {
        match stream.read(&mut buffer) {
            Ok(0) => break, // Koneksi ditutup
            Ok(bytes_read) => {
                // Menampilkan data yang diterima
                print!("{}", String::from_utf8_lossy(&buffer[..bytes_read]));
            }
            Err(e) => {
                eprintln!("Terjadi kesalahan saat membaca data: {}", e);
                break;
            }
        }
    }
}

fn main() {
    let listener = TcpListener::bind("127.0.0.1:6969").expect("Gagal mengikat soket ke port 6969");

    println!("Menjalankan server netcat di port 6969...");

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                // Menangani setiap koneksi dalam thread terpisah
                std::thread::spawn(move || {
                    handle_connection(stream);
                });
            }
            Err(e) => {
                eprintln!("Terjadi kesalahan saat menerima koneksi: {}", e);
                break;
            }
        }
    }
}
