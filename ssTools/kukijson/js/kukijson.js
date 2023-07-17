const fs = require("fs");

// Ambil argumen dari baris perintah
const args = process.argv.slice(2);

// Periksa apakah argumen yang diberikan sesuai dengan format yang diharapkan
if (args.length !== 2 || args[0] !== "-f") {
	console.log("Penggunaan: node program.js -f <nama_file.json>");
	process.exit(1);
}

const filename = args[1];

// Baca file JSON
fs.readFile(filename, "utf8", (err, data) => {
	if (err) {
		console.error("Gagal membaca file:", err);
		process.exit(1);
	}

	let jsonData;
	try {
		jsonData = JSON.parse(data);
	} catch (err) {
		console.error("Gagal memparse JSON:", err);
		process.exit(1);
	}

	const formattedData = formatData(jsonData);
	console.log(formattedData);
});

function formatData(data) {
	const namaArray = data.nama;
	const isiArray = data.isi;

	// Periksa apakah namaArray dan isiArray memiliki jumlah elemen yang sama
	if (namaArray.length !== isiArray.length) {
		return "";
	}

	let formattedString = "";

	for (let i = 0; i < namaArray.length; i++) {
		formattedString += `${namaArray[i]}=${isiArray[i]}`;

		// Tambahkan tanda ';' setiap kecuali elemen terakhir
		if (i !== namaArray.length - 1) {
			formattedString += ";";
		}
	}

	return formattedString;
}
