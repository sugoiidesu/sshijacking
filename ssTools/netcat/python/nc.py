import socket

host = "127.0.0.1"  
port = 6969

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server_socket.bind((host, port))

server_socket.listen(1)
print("Menjalankan server netcat di port 6969...")

client_socket, client_address = server_socket.accept()
print("Terhubung dari:", client_address)

while True:
    data = client_socket.recv(1024).decode()
    if not data:
        break

    print(data)

# Menutup koneksi
client_socket.close()
server_socket.close()
