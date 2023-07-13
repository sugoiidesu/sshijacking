import sys, urllib.parse, json


# Mengecek jumlah argumen yang diberikan
if len(sys.argv) > 2:
    # Mendapatkan nilai parameter setelah flag -u
    if sys.argv[1] == "-u":
        parameter = sys.argv[2]
        url_encoded_data = parameter
        parsed_data = urllib.parse.parse_qs(url_encoded_data)
        json_data = json.dumps(parsed_data)
        nil = json.loads(json_data)
        output = []
        for i in range(len(nil["nama[]"])):
            output.append(f"{nil['nama[]'][i]}={nil['isi[]'][i]}")
        result = ";".join(output)
        print("\n\nyour cookie:\n", result)
    else:
        print("Parameter tidak valid.")
else:
    print("Penggunaan: python kukiurldecode.py -u 'name1%5B%5D=val1&name2%5B%5D=val2'")
