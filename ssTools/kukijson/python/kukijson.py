import sys
import json


def formatData(data):
    namaArray = data["nama"]
    isiArray = data["isi"]

    if len(namaArray) != len(isiArray):
        return ""

    formattedString = ""

    for i in range(len(namaArray)):
        formattedString += f"{namaArray[i]}={isiArray[i]}"

        if i != len(namaArray) - 1:
            formattedString += ";"

    return formattedString


if len(sys.argv) != 3 or sys.argv[1] != "-f":
    print("Penggunaan: python program.py -f <nama_file.json>")
    sys.exit(1)

filename = sys.argv[2]


try:
    with open(filename) as file:
        jsonData = file.read()
except FileNotFoundError:
    print("File tidak ditemukan:", filename)
    sys.exit(1)
except IOError as e:
    print("Gagal membaca file:", filename)
    sys.exit(1)

try:
    data = json.loads(jsonData)
except json.JSONDecodeError as e:
    print("Gagal memparse JSON:", str(e))
    sys.exit(1)

print(formatData(data))
