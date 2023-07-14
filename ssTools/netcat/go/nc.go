package main

import (
	"fmt"
	"log"
	"net"
)

func main() {
	listener, err := net.Listen("tcp", "localhost:6969")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Menjalankan server netcat di port 6969...")

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Fatal(err)
		}

		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close()

	buffer := make([]byte, 1024)

	fmt.Printf("Menerima koneksi dari %s\n", conn.RemoteAddr().String())

	for {
		bytesRead, err := conn.Read(buffer)
		if err != nil {
			log.Println(err)
			break
		}
		data := string(buffer[:bytesRead])
		fmt.Print(data)
	}
}