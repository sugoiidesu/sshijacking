package main

import (
	"fmt"
	"log"
	"net"
)

func main() {
	// Inisialisasi server TCP yang mendengarkan di port 6969
	listener, err := net.Listen("tcp", "localhost:6969")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Menjalankan server netcat di port 6969...")

	// Terus menerima koneksi yang masuk
	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Fatal(err)
		}

		// Menangani setiap koneksi dalam goroutine terpisah
		go handleConnection(conn)
	}
}

// Fungsi untuk menangani koneksi masuk
func handleConnection(conn net.Conn) {
	defer conn.Close()

	// Buffer untuk menyimpan data yang diterima
	buffer := make([]byte, 1024)

	fmt.Printf("Menerima koneksi dari %s\n", conn.RemoteAddr().String())

	// Terus membaca data dari koneksi
	for {
		// Membaca data yang diterima ke buffer
		bytesRead, err := conn.Read(buffer)
		if err != nil {
			log.Println(err)
			break
		}

		// Konversi data buffer menjadi string dan tampilkan
		data := string(buffer[:bytesRead])
		fmt.Print(data)
	}
}