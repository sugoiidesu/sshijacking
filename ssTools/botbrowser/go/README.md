# browser bot with go

require

- `go`

## instalasi

ketik perintah berikut:

```sh
go mod init browserbot
```

install `selenium`

```sh
go get github.com/tebeka/selenium
```

## menjalankan tools

bisa langsung menggunakan seperti berikut ini:

```sh
go run main.go
```

atau dengan cara compile dulu baru jalankan.

```sh
go build main.go
./main
```

## penggunakan

untuk menggunakan program ini, tambahkan argument `--address` dan `--cookie`.

```sh
./main --address https://facebook.com --cookie 'name1=value1;name2=value2'
```

`--address`: merupakan alamat yang akan dituju. Dalam contoh diatas yaitu halaman `https://facebook.com`.
`--cookie`: merupakan cookie kamu. Dalam contoh diatas terdapat cookie name dan cookie value. cookie **name** terdiri dari `name1` dan `name2`, sedangkan cookie **value** terdiri dari `value1` dan `value2`.

## kesimpulan

jadi nantinya browser kamu akan terbuka kemudian mengunjungi alamat yang dituju dengan cookie yang sudah ditambahkan.
