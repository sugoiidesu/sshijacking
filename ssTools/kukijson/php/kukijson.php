<?php
// Periksa apakah argumen yang diberikan sesuai dengan format yang diharapkan
if ($argc != 3 || $argv[1] != '-f') {
  echo "Penggunaan: php program.php -f <nama_file.json>\n";
  exit(1);
}

$filename = $argv[2];

// Periksa apakah file JSON ada
if (!file_exists($filename)) {
  echo "File tidak ditemukan: $filename\n";
  exit(1);
}

// Baca file JSON
$jsonData = file_get_contents($filename);
if ($jsonData === false) {
  echo "Gagal membaca file: $filename\n";
  exit(1);
}

// Memparsing JSON menjadi array atau objek
$data = json_decode($jsonData, true);
if ($data === null) {
  echo "Gagal memparse JSON: " . json_last_error_msg() . "\n";
  exit(1);
}

// Lakukan pemrosesan sesuai kebutuhan Anda dengan $data
echo formatData($data) . "\n";

function formatData($data) {
  $namaArray = $data['nama'];
  $isiArray = $data['isi'];

  // Periksa apakah namaArray dan isiArray memiliki jumlah elemen yang sama
  if (count($namaArray) != count($isiArray)) {
    return '';
  }

  $formattedString = '';

  for ($i = 0; $i < count($namaArray); $i++) {
    $formattedString .= $namaArray[$i] . '=' . $isiArray[$i];

    // Tambahkan tanda ';' setiap kecuali elemen terakhir
    if ($i != count($namaArray) - 1) {
      $formattedString .= ';';
    }
  }

  return $formattedString;
}
?>
