<?php
// Mendapatkan argumen dari terminal
$arguments = getopt("u:");

// Memeriksa apakah argumen -u diberikan
if (isset($arguments['u'])) {
    $urlEncodedData = $arguments['u'];

    // Mendekode data URL-encoded menjadi JSON
    $decodedData = urldecode($urlEncodedData);
    $parsedData = [];
    parse_str($decodedData, $parsedData);
    $jsonData = json_encode($parsedData);

    $data = json_decode($jsonData, true);

    // Membangun string dengan format yang diinginkan
    $output = "";
    foreach ($data['nama'] as $index => $nama) {
        $isi = $data['isi'][$index];
        $output .= $nama . "=" . $isi . ";";
    }

    // Menghapus tanda titik koma (;) di akhir string
    $output = rtrim($output, ';');

    echo "\n\nyour cookie:\n" . $output . "\n";
} else {
    echo "Argumen -u tidak diberikan.\n";
}
?>