import socket

# Mendefinisikan host dan port untuk nc server
host = "127.0.0.1"  # Mengikat ke semua antarmuka jaringan
port = 6969

# Membuat socket TCP
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Mengikat socket ke host dan port
server_socket.bind((host, port))

# Mendengarkan koneksi masuk
server_socket.listen(1)
print("Menunggu koneksi...")

# Menerima koneksi
client_socket, client_address = server_socket.accept()
print("Terhubung dari:", client_address)

while True:
    # Menerima data dari klien
    data = client_socket.recv(1024).decode()
    if not data:
        # Koneksi ditutup oleh klien
        break

    print(data)

# Menutup koneksi
client_socket.close()
server_socket.close()
