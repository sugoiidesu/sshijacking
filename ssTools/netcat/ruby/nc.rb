require 'socket'

def handle_connection(client)
    puts "Menerima koneksi dari #{client.peeraddr[2]}"

    loop do
    # Menerima data dari koneksi
    data = client.recv(1024)
    break if data.empty?

    # Menampilkan data yang diterima
    puts data
    end

    client.close
end

# Inisialisasi server TCP yang mendengarkan di port 6969
server = TCPServer.new(6969)
puts 'Menjalankan server netcat di port 6969...'

loop do
    client = server.accept
    # Menangani setiap koneksi dalam thread terpisah
    Thread.new { handle_connection(client) }
end