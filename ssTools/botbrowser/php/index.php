<?php

require_once 'vendor/autoload.php';
use Facebook\WebDriver\Cookie;
use Facebook\WebDriver\Remote\RemoteWebDriver;
// use Facebook\WebDriver\Firefox\FirefoxOptions; // hapus komentar kode ini jika kamu menggunakan firefox
use Facebook\WebDriver\Chrome\ChromeOptions; // hapus komentar kode ini jika kmu menggunakan chrome
use Facebook\WebDriver\Remote\DesiredCapabilities;

if (!isset($argv[1]) || !isset($argv[2])) {
    echo "use: node index.js --address [url] --cookie [your_cookie]\n";
    echo "example: node index.js --address https://facebook.com --cookie 'cookieName1=cookieValue2;cookieName2=cookieValue2'\n";
    exit;
}

if ($argv[1] !== '--address') {
    echo "use: php index.php --address [url] --cookie [your_cookie]\n";
    echo "example: php index.php --address https://facebook.com --cookie 'cookieName1=cookieValue2;cookieName2=cookieValue2'\n";
    exit;
}

if ($argv[3] !== '--cookie') {
    echo "use: php index.php --address [url] --cookie [your_cookie]\n";
    echo "example: php index.php --address https://facebook.com --cookie 'cookieName1=cookieValue2;cookieName2=cookieValue2'\n";
    exit;
}

$address = $argv[2];
$cookie = $argv[4];

$cookieString = $cookie;
$cookieArray = explode(';', $cookieString);
$cookies = array();

foreach ($cookieArray as $cookie) {
    $cookieParts = explode('=', $cookie);
    if (count($cookieParts) == 2) {
        $name = trim($cookieParts[0]);
        $value = trim($cookieParts[1]);
        $cookies[] = array('name' => $name, 'value' => $value);
    }
}

$serverUrl = 'http://localhost:4444'; 

// $desiredCapabilities = DesiredCapabilities::firefox(); // hapus komentar kode ini jika kamu menggunakan firefox
$desiredCapabilities = DesiredCapabilities::chrome(); // hapus komentar kode ini jika kmu menggunakan chrome
$desiredCapabilities->setCapability('acceptSslCerts', false);

// $firefoxOptions = new FirefoxOptions(); // hapus komentar baris kode ini jika kamu pake firefox
$chromeOptions = new ChromeOptions(); // hapus komentar baris kode ini jika kamu pake chrome

// $desiredCapabilities->setCapability(FirefoxOptions::CAPABILITY, $firefoxOptions); // hapus komentar kode ini jika kamu menggunakan firefox
$desiredCapabilities->setCapability(ChromeOptions::CAPABILITY, $chromeOptions); // hapus komentar kode ini jika kmu menggunakan chrome

$driver = RemoteWebDriver::create($serverUrl, $desiredCapabilities);
$options = $driver->manage();
$driver->get($address);

for($i=0; $i < count($cookies); $i++){
    $kuki = new Cookie($cookies[$i]["name"], $cookies[$i]["value"]);
    $options->addCookie($kuki);
}
$driver->navigate()->refresh();

?>