const { Builder } = require("selenium-webdriver");
// const firefox = require("selenium-webdriver/firefox"); // jika pake firefox
const chrome = require("selenium-webdriver/chrome"); // jika pake chrome

async function runDriver(adrs, kuki) {
	const address = adrs;
	const cookie = kuki;
	const cookiesJSON = convertCookieStringToJSON(cookie);

	// const options = new firefox.Options();
	const options = new chrome.Options();

	// options.setBinary("firefox");
	// options.setBinary("chrome");

	// const driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build(); // hilangkan komentar baris kode ini jika menggunakan firefox
	const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build(); // hilangkan baris komentar ini jika kamu menggunakan chrome

	try {
		await driver.get(address);
		for (let i = 0; i < cookiesJSON.length - 1; i++) {
			await driver.manage().addCookie({ name: cookiesJSON[i]["name"], value: cookiesJSON[i]["value"] });
		}
		await driver.get(address);
	} catch {
		console.error;
	}
}

function convertCookieStringToJSON(cookieString) {
	const cookies = cookieString.split(";").map((cookie) => {
		const cookieParts = cookie.split("=");
		const name = cookieParts[0]?.trim();
		const value = cookieParts[1]?.trim();

		if (name && value) {
			return { name, value };
		}
	});
	const validCookies = cookies.filter((cookie) => cookie);

	return validCookies;
}

const args = process.argv.slice(2);

let address;
let cookie;

for (let i = 0; i < args.length; i++) {
	if (args[i] === "--address" && args[i + 1]) {
		address = args[i + 1];
	}
	if (args[i] === "--cookie" && args[i + 1]) {
		cookie = args[i + 1];
	}
}

if (!address || !cookie) {
	console.error("use: node index.js --address [url] --cookie [your_cookie]");
	console.log("example: node index.js --address https://facebook.com --cookie 'cookieName1=cookieValue2;cookieName2=cookieValue2'");
} else {
	runDriver(address, cookie).catch(console.error);
}
