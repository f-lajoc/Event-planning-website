document
	.getElementById("login-details-form")
	.addEventListener("submit", function (e) {
		e.preventDefault(); // stop form from refreshing the page

		// grab the input values
		const identifier = document.getElementById("identifier").value;
		const password = document.getElementById("password").value;

		// simple check (you can replace with backend validation later)
		if (identifier && password) {
			// save login status (so homepage knows user is logged in)
			localStorage.setItem("isLoggedIn", "true");

			// redirect to homepage
			window.location.href = "/homepage.html";
		} else {
			alert("Please enter both email/phone and password.");
		}
	});
