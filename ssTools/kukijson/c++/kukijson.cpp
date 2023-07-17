#include <iostream>
#include <fstream>
#include <string>
#include <jsoncpp/json/json.h>

using namespace std;

string formatData(const Json::Value& jsonData) {
    string result;

    const Json::Value& namaArray = jsonData["nama"];
    const Json::Value& isiArray = jsonData["isi"];

    if (namaArray.size() != isiArray.size()) {
        return result;
    }

    for (Json::ArrayIndex i = 0; i < namaArray.size(); ++i) {
        const string& nama = namaArray[i].asString();
        const string& isi = isiArray[i].asString();

        result += nama + "=" + isi;

        if (i != namaArray.size() - 1) {
            result += ";";
        }
    }

    return result;
}

int main(int argc, char* argv[]) {
    string filename;

    if (argc != 3) {
        cout << "Penggunaan: ./kukijson -f <nama_file.json>\n";
        return 1;
    }

    if (string(argv[1]) != "-f") {
        cout << "Penggunaan: ./kukijson -f <nama_file.json>\n";
        return 1;
    }

    filename = argv[2];

    ifstream file(filename);
    if (!file.is_open()) {
        cout << "Gagal membuka file: " << filename << '\n';
        return 1;
    }

    string jsonData((istreambuf_iterator<char>(file)),
    istreambuf_iterator<char>());

    Json::Value root;
    Json::Reader reader;
    if (!reader.parse(jsonData, root)) {
        cout << "Gagal memparse JSON\n";
        return 1;
    }

    string formattedData = formatData(root);
    if (formattedData.empty()) {
        cout << "Format data tidak valid\n";
        return 1;
    }

    cout << formattedData << '\n';

    file.close();

    return 0;
}
