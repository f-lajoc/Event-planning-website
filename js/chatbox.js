// Get references to DOM elements
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to display a message in the chat
function displayMessage(message, sender) {
	const messageDiv = document.createElement("div");
	messageDiv.classList.add("chat-message");

	const messageBubble = document.createElement("div");
	messageBubble.textContent = message;
	messageBubble.classList.add("chat-message-bubble", sender);

	if (sender === "user") {
		messageDiv.classList.add("user");
	}

	messageDiv.appendChild(messageBubble);
	chatContainer.appendChild(messageDiv);

	// Add message text
	const messageText = document.createElement("p");
	messageText.textContent = message;

	// Create timestamp
	const timeStamp = document.createElement("span");
	timeStamp.classList.add("timestamp");
	const now = new Date();
	timeStamp.textContent = now.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	// Append bubble + timestamp
	messageDiv.appendChild(messageBubble);
	messageDiv.appendChild(timeStamp);

	chatContainer.appendChild(messageDiv);

	// Scroll to the bottom of the chat container
	chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to get a pre-programmed bot response
function getBotResponse(userMessage) {
	const lowerCaseMsg = userMessage.toLowerCase();

	if (lowerCaseMsg.includes("hello") || lowerCaseMsg.includes("hi")) {
		return "Hello there! How can I help you?";
	} else if (lowerCaseMsg.includes("how are you")) {
		return "I'm doing great! Thanks for asking.";
	} else if (
		lowerCaseMsg.includes("available") ||
		lowerCaseMsg.includes("appointment") ||
		lowerCaseMsg.includes("booking")
	) {
		return "Yes,Thanks for requesting for our service.";
	} else if (lowerCaseMsg.includes("price") || lowerCaseMsg.includes("cost")) {
		return "An invoice will be sent to your email, Thank you.";
	} else if (lowerCaseMsg.includes("goodbye") || lowerCaseMsg.includes("bye")) {
		return "See you later! Feel free to come back anytime.";
	} else {
		return "I'm sorry, I don't understand that. Please try asking about appointment, price, or just say hello.";
	}
}

// Handle sending a message
function sendMessage() {
	const message = userInput.value.trim();
	if (message === "") return;

	// Display user message
	displayMessage(message, "user");

	// Get and display bot response after a short delay
	setTimeout(() => {
		const botResponse = getBotResponse(message);
		displayMessage(botResponse, "bot");
	}, 500);

	// Clear the input field
	userInput.value = "";
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		sendMessage();
	}
});
