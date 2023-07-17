#include <iostream>
#include <fstream>
#include <string>
#include <jsoncpp/json/json.h>

std::string formatData(const Json::Value& jsonData) {
    std::string result;

    const Json::Value& namaArray = jsonData["nama"];
    const Json::Value& isiArray = jsonData["isi"];

    // Periksa apakah namaArray dan isiArray memiliki jumlah elemen yang sama
    if (namaArray.size() != isiArray.size()) {
        return result;
    }

    for (Json::ArrayIndex i = 0; i < namaArray.size(); ++i) {
        const std::string& nama = namaArray[i].asString();
        const std::string& isi = isiArray[i].asString();

        result += nama + "=" + isi;

        // Tambahkan tanda ';' setiap kecuali elemen terakhir
        if (i != namaArray.size() - 1) {
            result += ";";
        }
    }

    return result;
}

int main(int argc, char* argv[]) {
    std::string filename;

    // Periksa apakah jumlah argumen valid
    if (argc != 3) {
        std::cout << "Penggunaan: program.exe -f <nama_file.json>\n";
        return 1;
    }

    // Periksa apakah argumen pertama adalah -f
    if (std::string(argv[1]) != "-f") {
        std::cout << "Penggunaan: program.exe -f <nama_file.json>\n";
        return 1;
    }

    // Ambil nama file dari argumen kedua
    filename = argv[2];

    // Buka file JSON
    std::ifstream file(filename);
    if (!file.is_open()) {
        std::cout << "Gagal membuka file: " << filename << '\n';
        return 1;
    }

    // Baca isi file JSON
    std::string jsonData((std::istreambuf_iterator<char>(file)),
    std::istreambuf_iterator<char>());

    // Parse data JSON
    Json::Value root;
    Json::Reader reader;
    if (!reader.parse(jsonData, root)) {
        std::cout << "Gagal memparse JSON\n";
        return 1;
    }

    // Ubah data JSON ke string dengan format yang diinginkan
    std::string formattedData = formatData(root);
    if (formattedData.empty()) {
        std::cout << "Format data tidak valid\n";
        return 1;
    }

    // Tampilkan hasil
    std::cout << formattedData << '\n';

    // Tutup file
    file.close();

    return 0;
}
