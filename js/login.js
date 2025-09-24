// dummy login before backend

// document
// 	.getElementById("login-details-form")
// 	.addEventListener("submit", function (e) {
// 		e.preventDefault(); // stop form from refreshing the page

// 		// grab the input values
// 		const identifier = document.getElementById("identifier").value;
// 		const password = document.getElementById("password").value;

// 		// simple check (you can replace with backend validation later)
// 		if (identifier && password) {
// 			// save login status (so homepage knows user is logged in)
// 			localStorage.setItem("isLoggedIn", "true");

// 			// redirect to homepage
// 			window.location.href = "/homepage.html";
// 		} else {
// 			alert("Please enter both email/phone and password.");
// 		}
// 	});

// login with backend
	document
		.getElementById("login-details-form")
		.addEventListener("submit", async function (e) {
			e.preventDefault(); // stop form from refreshing the page
console.log("submitted");
			// grab the input values
			const identifier = document.getElementById("identifier").value.trim();
			const password = document.getElementById("password").value.trim();

			if (!identifier || !password) {
				alert("Please enter both email/phone and password.");
				return;
			}

			try {
				// call backend login endpoint
				const response = await fetch(
					"https://evently-avc4.onrender.com/auth/login",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							username: identifier, // backend expects 'username'
							password: password,
						}),
					}
				);

				if (!response.ok) {
					// backend returns 401 or 400 if wrong
					const errorData = await response.json().catch(() => ({}));
					throw new Error(errorData.message || "Login failed");
				}

				const data = await response.json();

				// save the token and user info
				localStorage.setItem("token", data.token);
				localStorage.setItem(
					"user",
					JSON.stringify({
						id: data.id,
						username: data.username,
						email: data.email,
						roles: data.roles,
					})
				);

				// (optional) mark as logged in for quick checks
				localStorage.setItem("isLoggedIn", "true");

				// redirect to homepage (or dashboard)
				window.location.href = "/homepage.html";
			} catch (err) {
				console.error(err);
				alert(err.message || "Something went wrong. Please try again.");
			}
	
		});