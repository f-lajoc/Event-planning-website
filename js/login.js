// dummy login without backend

// document
// 	.getElementById("login-details-form")
// 	.addEventListener("submit", function (e) {
// 		e.preventDefault(); // stop form from refreshing the page
// console.log("submitted")
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



// corrected js from backend
document.getElementById("login-details-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault();
        console.log("Login form submitted");

        // Collect form values
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const rememberMe = document.getElementById("rememberMe").checked;

        // Basic validation
        if (!username || !password) {
            alert("Please enter both username and password!");
            return;
        }

        try {
            console.log("Sending login request to deployed backend...");
            
            const response = await fetch(
                "https://evently-avc4.onrender.com/auth/login", // Using deployed backend
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        rememberMe
                    }),
                }
            );

            console.log("Login response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                
                // Store the JWT token
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify({
                        username: data.username,
                        roles: data.roles || []
                    }));
                    console.log("JWT token stored successfully");
                }
                
                alert(`Welcome back, ${data.username}!`);
                
                // Redirect to dashboard or main page
                window.location.href = "./dashboard.html"; // Change this to your main page
            } else {
                const error = await response.json();
                console.error("Login error:", error);
                alert("Login failed: " + (error.message || error.error || "Invalid credentials"));
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Error connecting to server: " + err.message);
        }
    });

// Test backend connectivity on page load
window.addEventListener('load', async function() {
    console.log('Login page loaded');
    console.log('Frontend running on:', window.location.origin);
    console.log('Backend URL:', 'https://evently-avc4.onrender.com');
    
    // Check if user is already logged in
    const authToken = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (authToken && user) {
        console.log('User already logged in:', JSON.parse(user));
        // Optionally redirect to dashboard
        // window.location.href = "./dashboard.html";
    }
    
    // Test if backend is accessible
    try {
        const healthResponse = await fetch('https://evently-avc4.onrender.com/health', {
            method: 'GET',
        });
        
        if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('✅ Backend is accessible:', healthData);
        } else {
            console.warn('⚠️ Backend health check failed:', healthResponse.status);
        }
    } catch (error) {
        console.error('❌ Backend connectivity test failed:', error);
    }
});