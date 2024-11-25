const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// Function to display messages in the chat box
function displayMessage(content, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = content;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Function to send user input to the backend and get response
async function sendMessage() {
  const userMessage = userInput.value.trim();

  if (userMessage === "") return;

  // Display user message in the chat box
  displayMessage(userMessage, "user");

  // Clear the input field
  userInput.value = "";

  try {
    // Send the user message to the backend to get a response
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const responseData = await response.json();

    // Display the agent's response in the chat box
    displayMessage(responseData.reply, "agent");
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// Attach event listener to the send button
sendBtn.addEventListener("click", sendMessage);

// Optional: Allow user to press Enter to send a message
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
