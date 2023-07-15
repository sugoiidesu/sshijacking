const arguments = process.argv.slice(2);

if (arguments[0] === "-u") {
	const urlEncodedData = arguments[1];

	const pairs = urlEncodedData.split("&");

	const jsonData = {};

	pairs.forEach((pair) => {
		const [name, value] = pair.split("=");
		const decodedName = decodeURIComponent(name);
		const decodedValue = decodeURIComponent(value);

		if (jsonData.hasOwnProperty(decodedName)) {
			jsonData[decodedName].push(decodedValue);
		} else {
			jsonData[decodedName] = [decodedValue];
		}
	});

	if (jsonData["isi[]"].length !== jsonData["nama[]"].length) {
		console.log("Panjang array 'isi' dan 'nama' tidak sama.");
	} else {
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
	console.log("node kukiurldecode.js -u '[url_encode_data]'");
}
