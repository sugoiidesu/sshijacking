import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class nc {

    public static void main(String[] args) {
        try {
            // Membuat server socket yang mendengarkan di port 6969
            ServerSocket serverSocket = new ServerSocket(6969);
            System.out.println("Menjalankan server netcat di port 6969...");

            while (true) {
                // Menerima koneksi masuk dari client
                Socket clientSocket = serverSocket.accept();
                System.out.println("Menerima koneksi dari " + clientSocket.getInetAddress().getHostAddress());

                // Membaca data yang diterima dari client
                BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }

                // Menutup koneksi dengan client
                clientSocket.close();
                System.out.println("Koneksi ditutup\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}