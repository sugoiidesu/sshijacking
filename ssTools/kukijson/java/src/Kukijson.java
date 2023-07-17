import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.annotations.SerializedName;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

class Data {
    @SerializedName("nama")
    String[] nama;

    @SerializedName("isi")
    String[] isi;
}

public class Kukijson {
    public static void main(String[] args) {
        if (args.length != 2 || !args[0].equals("-f")) {
            System.out.println("Penggunaan: java Main -f <nama_file.json>");
            System.exit(1);
        }

        String filename = args[1];
        String jsonData = readJsonFile(filename);

        Gson gson = new Gson();
        Data data;
        try {
            data = gson.fromJson(jsonData, Data.class);
        } catch (JsonSyntaxException e) {
            System.out.println("Gagal memparse JSON");
            System.exit(1);
            return;
        }

        String formattedData = formatData(data);
        System.out.println(formattedData);
    }

    private static String readJsonFile(String filename) {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
            System.out.println("Gagal membuka file: " + filename);
            System.exit(1);
        }
        return sb.toString();
    }

    private static String formatData(Data data) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < data.nama.length; i++) {
            sb.append(data.nama[i]).append("=").append(data.isi[i]);
            if (i != data.nama.length - 1) {
                sb.append(";");
            }
        }
        return sb.toString();
    }
}
