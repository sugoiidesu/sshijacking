#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <jsoncpp/json/json.h>

using namespace std;

string urldecode(const string& encoded) {
    stringstream hexStream;
    string result;

    for (size_t i = 0; i < encoded.length(); ++i) {
        char ch = encoded[i];
        if (ch == '%') {
            if (i + 2 < encoded.length()) {
                hexStream << encoded.substr(i + 1, 2);
                int hexValue;
                hexStream >> hex >> hexValue;
                hexStream.clear();
                result += static_cast<char>(hexValue);
                i += 2;
            }
        } else if (ch == '+') {
            result += ' ';
        } else {
            result += ch;
        }
    }
    return result;
}



int main(int argc, char* argv[]) {
    if (argc > 1 && string(argv[1]) == "-u") {
        if (argc > 2) {
            string encodedData = argv[2];
            string decodedData = urldecode(encodedData);
            stringstream ss(decodedData);
            string keyValue;
            map<string, vector<string>> dataMap;
            while (getline(ss, keyValue, '&')) {
                size_t pos = keyValue.find('=');
                if (pos != string::npos) {
                    string key = urldecode(keyValue.substr(0, pos));
                    string value = urldecode(keyValue.substr(pos + 1));
                    dataMap[key].push_back(value);
                }
            }

            Json::Value jsonData(Json::objectValue);
            for (const auto& entry : dataMap) {
                const string& key = entry.first;
                const vector<string>& values = entry.second;
                if (values.size() == 1) {
                    jsonData[key] = values[0];
                } else {
                    Json::Value jsonArray(Json::arrayValue);
                    for (const string& value : values) {
                        jsonArray.append(value);
                    }
                    jsonData[key] = jsonArray;
                }
            }

            Json::StreamWriterBuilder writer;
            string jsonStr = Json::writeString(writer, jsonData);
            size_t namaSize = dataMap["nama[]"].size();
            size_t isiSize = dataMap["isi[]"].size();
            if (namaSize != isiSize) {
                cout << "The number of elements in nama[] and isi[] is not the same." << endl;
                return 0;
            }

            cout << "\n\nyour cookie:\n";
            for (int i = 0; i< jsonData["nama[]"].size(); i++){
                cout << jsonData["nama[]"][i].asString() << "=" << jsonData["isi[]"][i].asString();
                if (i < jsonData["nama[]"].size() - 1) {
                    std::cout << ";";
                }
            }
            cout << endl;
        } else {
            cout << "no value provided after -u argument." << endl;
        }
    } else {
        cout << "help: ./kukiurldecode -u '[url_encode_data]'" << endl;
    }

    return 0;
}
