npm init
npm install selenium-webdriver
node index.js

# browser bot with javascript

require

- `nodejs`

## instalasi

inisialisasi project:

```bash
npm init
```

install `selenium-webdriver`

```bash
npm install selenium-webdriver
```

## menjalankan tools

untuk menjalankan tools, ketik perintah berikut:

```bash
node index.js
./main
```

## penggunaan

untuk menggunakan program ini, tambahkan argument `--address` dan `--cookie`.

```bash
node index.js --address https://facebook.com --cookie 'name1=value1;name2=value2'
```

`--address`: merupakan alamat yang akan dituju. Dalam contoh diatas yaitu halaman `https://facebook.com`.
`--cookie`: merupakan cookie kamu. Dalam contoh diatas terdapat cookie name dan cookie value. cookie **name** terdiri dari `name1` dan `name2`, sedangkan cookie **value** terdiri dari `value1` dan `value2`.

## kesimpulan

jadi nantinya browser kamu akan terbuka kemudian mengunjungi alamat yang dituju dengan cookie yang sudah ditambahkan.
