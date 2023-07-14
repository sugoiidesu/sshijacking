require 'socket'

def handle_connection(client)
    puts "Menerima koneksi dari #{client.peeraddr[2]}"

    loop do
    data = client.recv(1024)
    break if data.empty?

    puts data
    end

    client.close
end

server = TCPServer.new(6969)
puts 'Menjalankan server netcat di port 6969...'

loop do
    client = server.accept
    Thread.new { handle_connection(client) }
end