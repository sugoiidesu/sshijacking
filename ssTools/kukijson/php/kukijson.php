<?php
if ($argc != 3 || $argv[1] != '-f') {
  echo "Penggunaan: php program.php -f <nama_file.json>\n";
  exit(1);
}

$filename = $argv[2];

if (!file_exists($filename)) {
  echo "File tidak ditemukan: $filename\n";
  exit(1);
}

$jsonData = file_get_contents($filename);
if ($jsonData === false) {
  echo "Gagal membaca file: $filename\n";
  exit(1);
}

$data = json_decode($jsonData, true);
if ($data === null) {
  echo "Gagal memparse JSON: " . json_last_error_msg() . "\n";
  exit(1);
}

echo formatData($data) . "\n";

function formatData($data) {
  $namaArray = $data['nama'];
  $isiArray = $data['isi'];

  if (count($namaArray) != count($isiArray)) {
    return '';
  }

  $formattedString = '';

  for ($i = 0; $i < count($namaArray); $i++) {
    $formattedString .= $namaArray[$i] . '=' . $isiArray[$i];

    if ($i != count($namaArray) - 1) {
      $formattedString .= ';';
    }
  }

  return $formattedString;
}
?>
