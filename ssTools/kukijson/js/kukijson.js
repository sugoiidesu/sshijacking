const fs = require("fs");

const args = process.argv.slice(2);

if (args.length !== 2 || args[0] !== "-f") {
	console.log("Penggunaan: node program.js -f <nama_file.json>");
	process.exit(1);
}

const filename = args[1];

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

	if (namaArray.length !== isiArray.length) {
		return "";
	}

	let formattedString = "";

	for (let i = 0; i < namaArray.length; i++) {
		formattedString += `${namaArray[i]}=${isiArray[i]}`;

		if (i !== namaArray.length - 1) {
			formattedString += ";";
		}
	}

	return formattedString;
}
