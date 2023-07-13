const net = require("net");

// Fungsi untuk menangani koneksi masuk
function handleConnection(socket) {
	console.log(`Menerima koneksi dari ${socket.remoteAddress}:${socket.remotePort}`);

	// Menangani data yang diterima
	socket.on("data", (data) => {
		// Menampilkan data yang diterima
		console.log(data.toString());
	});

	// Menangani penutupan koneksi
	socket.on("end", () => {
		console.log("Koneksi ditutup");
	});

	// Menangani kesalahan koneksi
	socket.on("error", (error) => {
		console.error("Terjadi kesalahan koneksi:", error);
	});
}

// Membuat server TCP yang mendengarkan di port 6969
const server = net.createServer(handleConnection);

// Menjalankan server netcat di port 6969
server.listen(6969, () => {
	console.log("Menjalankan server netcat di port 6969...");
});
