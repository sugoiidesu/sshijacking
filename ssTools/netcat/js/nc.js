const net = require("net");

function handleConnection(socket) {
	console.log(`Menerima koneksi dari ${socket.remoteAddress}:${socket.remotePort}`);
	socket.on("data", (data) => {
		console.log(data.toString());
	});

	socket.on("end", () => {
		console.log("Koneksi ditutup");
	});

	socket.on("error", (error) => {
		console.error("Terjadi kesalahan koneksi:", error);
	});
}

const server = net.createServer(handleConnection);

server.listen(6969, () => {
	console.log("Menjalankan server netcat di port 6969...");
});
