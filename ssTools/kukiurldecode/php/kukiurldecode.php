<?php
$arguments = getopt("u:");

if (isset($arguments['u'])) {
    $urlEncodedData = $arguments['u'];

    $decodedData = urldecode($urlEncodedData);
    $parsedData = [];
    parse_str($decodedData, $parsedData);
    $jsonData = json_encode($parsedData);

    $data = json_decode($jsonData, true);

    $output = "";
    foreach ($data['nama'] as $index => $nama) {
        $isi = $data['isi'][$index];
        $output .= $nama . "=" . $isi . ";";
    }

    $output = rtrim($output, ';');

    echo "\n\nyour cookie:\n" . $output . "\n";
} else {
    echo "Argumen -u tidak diberikan.\n";
}
?>