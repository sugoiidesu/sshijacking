rust
---------------
buka terminal lalu masuk ke direktori project.
ketik perintah 'cargo init'.
kemudian file Cargo.toml akan otomatis terbuat.
tambahkan urlencoding = "1.0.0" dibawah baris dependencies
build ulang dengan perintah 'cargo build' atau 'cargo run'
jalankan programnya. 
./kukiurldecode -u

java
------------
javac -cp lib/json.jar src/Kukiurldecode.java
java -cp src:lib/json.jar Kukiurldecode -u

C++
-----------
g++ kukiurldecode.cpp -ljsoncpp -o kukiurldecode
sudo apt-get install libjsoncpp-dev # linux
brew install jsoncpp # mac
