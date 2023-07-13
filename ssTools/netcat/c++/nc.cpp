#include <iostream>
#include <cstring>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int main() {
    int server_fd, new_socket, valread;
    struct sockaddr_in address;
    int opt = 1;
    int addrlen = sizeof(address);
    char buffer[1024] = {0};

    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        std::cerr << "Gagal membuat socket" << std::endl;
        return 1;
    }

    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt))) {
        std::cerr << "Gagal menyetel opsi soket" << std::endl;
        return 1;
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(6969);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        std::cerr << "Gagal mengikat soket ke port 6969" << std::endl;
        return 1;
    }

    if (listen(server_fd, 3) < 0) {
        std::cerr << "Gagal mendengarkan soket" << std::endl;
        return 1;
    }

    std::cout << "Menjalankan server netcat di port 6969..." << std::endl;

    while (true) {
        if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen)) < 0) {
            std::cerr << "Gagal menerima koneksi" << std::endl;
            return 1;
        }

        std::cout << "Menerima koneksi dari " << inet_ntoa(address.sin_addr) << ":" << ntohs(address.sin_port) << std::endl;

        while ((valread = read(new_socket, buffer, sizeof(buffer))) > 0) {
            std::cout << buffer;
            memset(buffer, 0, sizeof(buffer));
        }

        close(new_socket);
        std::cout << "\n Koneksi ditutup" << std::endl << std::endl;
    }

    return 0;
}