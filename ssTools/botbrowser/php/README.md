# browser bot with javascript

require

- `php`
- `composer`

## instalasi

install `selenium-webdriver` menggunakan composer

```bash
composer install
```

## menjalankan tools

sebelum menjalankan tools, jalankan dulu chromedriver atau geckodriver.

untuk chromedriver

```bash
./chromedriver --port=4444
```

atau untuk geckodriver

```bash
./geckodriver
```

setelah chromedriver atau geckodriver berjalan, baru jalankan toolsnya.

```bash
php index.php
```

## penggunaan

untuk menggunakan program ini, tambahkan argument `--address` dan `--cookie`.

```bash
php index.php --address https://facebook.com --cookie 'name1=value1;name2=value2'
```

`--address`: merupakan alamat yang akan dituju. Dalam contoh diatas yaitu halaman `https://facebook.com`. <br/>
`--cookie`: merupakan cookie kamu. Dalam contoh diatas terdapat cookie name dan cookie value. cookie **name** terdiri dari `name1` dan `name2`, sedangkan cookie **value** terdiri dari `value1` dan `value2`.

## kesimpulan

jadi nantinya browser kamu akan terbuka kemudian mengunjungi alamat yang dituju dengan cookie yang sudah ditambahkan.
