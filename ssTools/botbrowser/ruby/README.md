# browser bot with ruby

require

- `ruby`
- `gem`

## instalasi

install `selenium-webdriver` menggunakan gem

```bash
gem bundle install
```

## menjalankan tools

untuk menjalankan toolsnya, ketik perintah berikut.

```bash
ruby browserbot.rb
```

## penggunaan

untuk menggunakan program ini, tambahkan argument `--address` dan `--cookie`.

```bash
ruby browserbot.rb --address https://facebook.com --cookie 'name1=value1;name2=value2'
```

`--address`: merupakan alamat yang akan dituju. Dalam contoh diatas yaitu halaman `https://facebook.com`. <br/>
`--cookie`: merupakan cookie kamu. Dalam contoh diatas terdapat cookie name dan cookie value. cookie **name** terdiri dari `name1` dan `name2`, sedangkan cookie **value** terdiri dari `value1` dan `value2`.

## kesimpulan

jadi nantinya browser kamu akan terbuka kemudian mengunjungi alamat yang dituju dengan cookie yang sudah ditambahkan.
