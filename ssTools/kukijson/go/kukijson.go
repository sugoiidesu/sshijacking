package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
)

type Data struct {
	Nama []string `json:"nama"`
	Isi  []string `json:"isi"`
}

func main() {
	filename := flag.String("f", "", "Nama file JSON")
	flag.Parse()

	if *filename == "" {
		fmt.Println("Penggunaan: go run kukijson.go -f <nama_file.json>")
		os.Exit(1)
	}

	jsonData, err := ioutil.ReadFile(*filename)
	if err != nil {
		fmt.Printf("Gagal membuka file: %s\n", *filename)
		os.Exit(1)
	}

	var data Data
	err = json.Unmarshal(jsonData, &data)
	if err != nil {
		fmt.Println("Gagal memparse JSON")
		os.Exit(1)
	}

	formattedData := formatData(data)
	fmt.Println(formattedData)
}

func formatData(data Data) string {
	result := ""

	for i := 0; i < len(data.Nama); i++ {
		nama := data.Nama[i]
		isi := data.Isi[i]

		result += fmt.Sprintf("%s=%s", nama, isi)

		if i != len(data.Nama)-1 {
			result += ";"
		}
	}

	return result
}
