import sys, urllib.parse, json


if len(sys.argv) > 2:
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
    print("python kukiurldecode.py -u '[url_encode_data]")
