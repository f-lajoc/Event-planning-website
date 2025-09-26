// integrated backend

document
	.getElementById("signup-details-form")
	.addEventListener("submit", async function (e) {
		e.preventDefault();
console.log("submitted")
		// collect form values
		const username = document.getElementById("username").value.trim();
		const firstName = document.getElementById("firstName").value.trim();
		const lastName = document.getElementById("lastName").value.trim();
		const email = document.getElementById("identifier").value.trim();
		const phone = document.getElementById("phone").value.trim();
		const password = document.getElementById("password").value.trim();
		const role = document.getElementById("role").value;

		try {
			const response = await fetch(
				"https://evently-avc4.onrender.com/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username,
						email,
						password,
						firstName,
						lastName,
						phone,
						role,
					}),
				}
			);

			if (response.ok) {
				alert("Signup successful! You can now log in.");
				window.location.href = "./login-pg.html"; // redirect to login page
			} else {
				const error = await response.json();
				alert("Signup failed: " + (error.message || JSON.stringify(error)));
			}
		} catch (err) {
			alert("Error connecting to server: " + err.message);
		}
	});
