// // integrated backend

// document
// 	.getElementById("signup-details-form")
// 	.addEventListener("submit", async function (e) {
// 		e.preventDefault();
// console.log("submitted")
// 		// collect form values
// 		const username = document.getElementById("username").value.trim();
// 		const firstName = document.getElementById("firstName").value.trim();
// 		const lastName = document.getElementById("lastName").value.trim();
// 		const email = document.getElementById("identifier").value.trim();
// 		const phone = document.getElementById("phone").value.trim();
// 		const password = document.getElementById("password").value.trim();
// 		const role = document.getElementById("role").value;

// 		try {
// 			const response = await fetch(
// 				"https://evently-avc4.onrender.com/auth/register",
// 				{
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({
// 						username,
// 						email,
// 						password,
// 						firstName,
// 						lastName,
// 						phone,
// 						role,
// 					}),
// 				}
// 			);

// 			if (response.ok) {
// 				alert("Signup successful! You can now log in.");
// 				window.location.href = "./login-pg.html"; // redirect to login page
// 			} else {
// 				const error = await response.json();
// 				alert("Signup failed: " + (error.message || JSON.stringify(error)));
// 			}
// 		} catch (err) {
// 			alert("Error connecting to server: " + err.message);
// 		}
// 	});


// corrected version
document.getElementById("signup-details-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault();
        console.log("Form submitted");

        // Collect form values
        const username = document.getElementById("username").value.trim();
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Validation: Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Validation: Check password length (basic)
        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        try {
            console.log("Sending registration request...");
            
            const response = await fetch(
                "https://evently-avc4.onrender.com/auth/register",
                {
                    method: "POST",
                    mode: "cors", // Explicitly set CORS mode
                    credentials: "include", // Important for CORS with authentication
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        confirmPassword, // Added this required field
                        firstName,
                        lastName
                        // Removed phone and role as they're not expected by backend
                    }),
                }
            );

            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successful:", data);
                
                // Store the JWT token if provided
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify({
                        id: data.id,
                        username: data.username,
                        email: data.email
                    }));
                }
                
                alert("Registration successful! Welcome ${data.username!");
                window.location.href = "./login-pg.html"; // redirect to login page
            } else {
                const error = await response.json();
                console.error("Registration error:", error);
                alert("Registration failed: " + (error.message || error.error || JSON.stringify(error)));
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Error connecting to server: " + err.message);
        }
    });

// Add password confirmation validation
document.getElementById("confirmPassword").addEventListener("input", function() {
    const password = document.getElementById("password").value;
    const confirmPassword = this.value;
    
    if (password !== confirmPassword) {
        this.setCustomValidity("Passwords do not match");
    } else {
        this.setCustomValidity("");
    }
});

// Real-time password validation
document.getElementById("password").addEventListener("input", function() {
    const password = this.value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    if (password.length < 6) {
        this.setCustomValidity("Password must be at least 6 characters long");
    } else {
        this.setCustomValidity("");
    }
    
    // Also check confirm password if it has value
    if (confirmPassword && password !== confirmPassword) {
        document.getElementById("confirmPassword").setCustomValidity("Passwords do not match");
    } else {
        document.getElementById("confirmPassword").setCustomValidity("");
    }
});
