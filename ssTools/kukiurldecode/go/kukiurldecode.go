package main

import (
	"fmt"
	"net/url"
	"os"
	"strings"
)

func main() {

	args := os.Args[1:] 

	if len(args) > 0 && args[0] == "-u" {
		if len(args) > 1 {
			encodeData := args[1]

			decodedData, err := url.QueryUnescape(encodeData)
			if err != nil {
				fmt.Println("Gagal melakukan decoding data URL-encoded.")
				return
			}

			parsedData, err := url.ParseQuery(decodedData)
			if err != nil {
				fmt.Println("Gagal melakukan parsing data URL-encoded.")
				return
			}

			jsonData := make(map[string][]string)

			for key, values := range parsedData {
				jsonData[key] = values
			}
			fmt.Println(jsonData["isi[]"])

			if len(jsonData["nama[]"]) != len(jsonData["isi[]"]) {
				fmt.Println("Jumlah data tidak sama")
				return
			}
		
			var result []string
		
			for i := 0; i < len(jsonData["nama[]"]); i++ {
				result = append(result, fmt.Sprintf("%s=%s", jsonData["nama[]"][i], jsonData["isi[]"][i]))
			}
		
			output := ""
			if len(result) > 0 {
				output = strings.Join(result, ";")
			}
		
			fmt.Println("\n\nyour cookie:\n",output)
			
		} else {
			fmt.Println("Argumen -u tidak memiliki nilai.")
		}
	} else {
		fmt.Println("Argumen -u tidak ditemukan.")
	}

	
}