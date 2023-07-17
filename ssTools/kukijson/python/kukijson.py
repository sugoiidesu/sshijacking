import sys
import json


def formatData(data):
    namaArray = data["nama"]
    isiArray = data["isi"]

    # Periksa apakah namaArray dan isiArray memiliki jumlah elemen yang sama
    if len(namaArray) != len(isiArray):
        return ""

    formattedString = ""

    for i in range(len(namaArray)):
        formattedString += f"{namaArray[i]}={isiArray[i]}"

        # Tambahkan tanda ';' setiap kecuali elemen terakhir
        if i != len(namaArray) - 1:
            formattedString += ";"

    return formattedString


# Periksa apakah argumen yang diberikan sesuai dengan format yang diharapkan
if len(sys.argv) != 3 or sys.argv[1] != "-f":
    print("Penggunaan: python program.py -f <nama_file.json>")
    sys.exit(1)

filename = sys.argv[2]


# Baca file JSON
try:
    with open(filename) as file:
        jsonData = file.read()
except FileNotFoundError:
    print("File tidak ditemukan:", filename)
    sys.exit(1)
except IOError as e:
    print("Gagal membaca file:", filename)
    sys.exit(1)

# Memparsing JSON
try:
    data = json.loads(jsonData)
except json.JSONDecodeError as e:
    print("Gagal memparse JSON:", str(e))
    sys.exit(1)

# Lakukan pemrosesan sesuai kebutuhan Anda dengan data
print(formatData(data))
