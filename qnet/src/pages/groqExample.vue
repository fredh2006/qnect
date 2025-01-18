<template>
  <div class="chat-page">
    <div class="chat-container">
      <div v-for="(message, index) in chatMessages" :key="index" class="chat-message">
        <span :class="message.sender === 'User' ? 'user-message' : 'bot-message'">
          <strong>{{ message.sender }}:</strong> {{ message.text }}
        </span>
      </div>
    </div>
    <div class="chat-input">
      <input v-model="userInput" type="text" placeholder="Type your message..." @keyup.enter="sendMessage" />
      <button @click="sendMessage">Dating Advice</button>
    </div>
  </div>
</template>

<script>
import { getGroqResponse } from "../groqClient";

export default {
  data() {
    return {
      userInput: "",
      chatMessages: [],
    };
  },
  mounted() {
    // Add an introduction message when the component is mounted
    this.chatMessages.push({
      sender: "Rizz God",
      text: "Hi! I'm your dating coach, here to offer you personalized advice. Ask me anything about dating, relationships, or how to find the perfect partner!",
    });
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === "") return;

      this.chatMessages.push({ sender: "User", text: this.userInput });

      // Predefined instruction for the LLM
      const predefinedPrompt =
        "Pretend you're a professional dating coach. You provide insightful and supportive advice on everything related to dating. Your advice should be thoughtful and applicable to various types of dating situations. When a user provides a prompt, respond with tips, strategies, or suggestions they can apply in their situation.";

      // Combine the predefined prompt with the user's input
      const prompt = `${predefinedPrompt}\n\nUser's situation: ${this.userInput}`;
      this.userInput = "";

      try {
        // Send the request to the language model API
        const result = await getGroqResponse(prompt);
        this.chatMessages.push({ sender: "Rizz God", text: result }); // Store the response from the LLM
        console.log(this.response);

        // Clear the input field
      } catch (err) {
        this.error = err.message; // Store any errors
        console.log(this.error);
      }
    },
  },
};
</script>

<style scoped>
.chat-page {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;

  /* Center the component */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  min-height: 100vh; /* Full viewport height */
}


.chat-container {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  height: 400px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.chat-message {
  margin: 10px 0;
}

.user-message {
  color: #007bff;
}

.bot-message {
  color: #28a745;
}

.chat-input {
  display: flex;
  margin-top: 10px;
  gap: 5px; /* Adds space between the input and button */
  width: 100%; /* Ensure it spans the entire width of the container */
}

.chat-input input {
  flex: 0 0 75%; /* Fixed 75% width */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px; /* Fully rounded corners */
  outline: none;
  box-sizing: border-box; /* Ensures padding doesn't exceed the width */
}

.chat-input button {
  flex: 0 0 24%; /* Fixed 25% width */
  padding: 10px;
  border: none;
  background-color: rgba(27, 38, 59, 1);
  color: #ff6f61;
  border-radius: 5px; /* Fully rounded corners */
  cursor: pointer;
  box-sizing: border-box;
}

.chat-input button:hover {
  background-color:  rgb(81, 87, 98);

}


</style>
