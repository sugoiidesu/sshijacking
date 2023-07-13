package main

import (
	"fmt"
	"net/url"
	"os"
	"strings"
)

func main() {

	args := os.Args[1:] // Mengambil argumen dari indeks 1 (indeks 0 berisi nama program)

	// Mengecek apakah argumen -u diberikan
	if len(args) > 0 && args[0] == "-u" {
		// Menampilkan kembali nilai argumen setelah -u
		if len(args) > 1 {
			encodeData := args[1]

			decodedData, err := url.QueryUnescape(encodeData)
			if err != nil {
				fmt.Println("Gagal melakukan decoding data URL-encoded.")
				return
			}

			// Parsing data menjadi map
			parsedData, err := url.ParseQuery(decodedData)
			if err != nil {
				fmt.Println("Gagal melakukan parsing data URL-encoded.")
				return
			}

			// Membuat map kosong untuk menampung data JSON
			jsonData := make(map[string][]string)

			// Mengisi data JSON
			for key, values := range parsedData {
				jsonData[key] = values
			}
			fmt.Println(jsonData["isi[]"])

			if len(jsonData["nama[]"]) != len(jsonData["isi[]"]) {
				fmt.Println("Jumlah data tidak sama")
				return
			}
		
			// Membuat slice baru untuk menampung hasil
			var result []string
		
			// Melakukan perulangan untuk setiap pasangan key-value
			for i := 0; i < len(jsonData["nama[]"]); i++ {
				result = append(result, fmt.Sprintf("%s=%s", jsonData["nama[]"][i], jsonData["isi[]"][i]))
			}
		
			// Menggabungkan hasil menjadi satu string dengan pemisah ;
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