const arguments = process.argv.slice(2);

// Memeriksa apakah argumen -u diberikan
if (arguments[0] === "-u") {
	const urlEncodedData = arguments[1];

	// Memisahkan pasangan nama dan isi
	const pairs = urlEncodedData.split("&");

	// Membuat objek JSON baru
	const jsonData = {};

	// Memproses setiap pasangan nama dan isi
	pairs.forEach((pair) => {
		const [name, value] = pair.split("=");
		const decodedName = decodeURIComponent(name);
		const decodedValue = decodeURIComponent(value);

		// Mengecek apakah nama sudah ada dalam objek JSON
		if (jsonData.hasOwnProperty(decodedName)) {
			// Jika sudah ada, tambahkan value ke array
			jsonData[decodedName].push(decodedValue);
		} else {
			// Jika belum ada, buat array baru dengan value pertama
			jsonData[decodedName] = [decodedValue];
		}
	});

	if (jsonData["isi[]"].length !== jsonData["nama[]"].length) {
		console.log("Panjang array 'isi' dan 'nama' tidak sama.");
	} else {
		// Mengubah JSON menjadi format yang diinginkan
		let output = "";
		for (let i = 0; i < jsonData["isi[]"].length; i++) {
			output += `${jsonData["nama[]"][i]}=${jsonData["isi[]"][i]}`;
			if (i !== jsonData["isi[]"].length - 1) {
				output += ";";
			}
		}
		console.log("\n\nyour cookie:\n" + output);
	}
} else {
	console.log("Argumen -u tidak diberikan.");
}
