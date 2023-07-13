<?php

$server = stream_socket_server("tcp://0.0.0.0:6969", $errno, $errstr);

if (!$server) {
    die("Gagal membuka soket: $errstr ($errno)");
}

echo "Menjalankan server netcat di port 6969...\n";

while (true) {
    $client = stream_socket_accept($server);

    $clientAddress = stream_socket_get_name($client, true);

    echo "Menerima koneksi dari $clientAddress\n";

    while (!feof($client)) {
        $data = fread($client, 8192);
        echo $data;
    }

    fclose($client);
    echo "Koneksi ditutup\n\n";
}

fclose($server);
?>