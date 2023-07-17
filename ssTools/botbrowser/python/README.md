# browser bot with python

require

- `python` versi 3 ketas

## instalasi

install `selenium-webdriver` menggunakan pip

```bash
pip install selenium
```

## menjalankan tools

untuk menjalankan toolsnya, ketik perintah berikut.

```bash
python browserbot.py
```

## penggunaan

untuk menggunakan program ini, tambahkan argument `--address` dan `--cookie`.

```bash
python browserbot.py --address https://facebook.com --cookie 'name1=value1;name2=value2'
```

`--address`: merupakan alamat yang akan dituju. Dalam contoh diatas yaitu halaman `https://facebook.com`. <br/>
`--cookie`: merupakan cookie kamu. Dalam contoh diatas terdapat cookie name dan cookie value. cookie **name** terdiri dari `name1` dan `name2`, sedangkan cookie **value** terdiri dari `value1` dan `value2`.

## kesimpulan

jadi nantinya browser kamu akan terbuka kemudian mengunjungi alamat yang dituju dengan cookie yang sudah ditambahkan.
