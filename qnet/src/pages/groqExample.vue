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
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.chat-input button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}
</style>
