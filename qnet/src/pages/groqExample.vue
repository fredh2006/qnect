<template>
  <div class="gradient-background">
    
    <header class="nav-header" role="banner">
      <nav class="nav-container" role="navigation" aria-label="Main navigation">
        <div class="logo-container">
          <div @click = "goHome"class="logo-wrapper">
            <img
              loading="lazy"
              src="/public/qc_logo.png"
              class="logo-image"
              alt="Company Logo"
            />
          </div>
        </div>
        
        <ul class="nav-links" role="menubar">
          <li role="none">
            <a href="#" class="nav-item explore-button" role="menuitem" tabindex="0">Explore</a>
          </li>
          <li role="none">
            <a href="/matches" class="nav-item active" role="menuitem" tabindex="0">Matches</a>
          </li>
          <li role="none">
            <a href="/dashboard" class="nav-item chat-button" role="menuitem" tabindex="0">Dashboard</a>
          </li>
          <li role="none">
            <a href="/yourprofile" class="nav-item profile-button" role="menuitem" tabindex="0"></a>
          </li>
        </ul>
      </nav>
    </header>

    <div class="chat-page">
      <div class="chat-container">
        <div v-for="(message, index) in chatMessages" :key="index" class="chat-message">
          <span :class="message.sender === 'User' ? 'user-message' : 'bot-message'">
            <strong>{{ message.sender }}: </strong> 
            <span v-if="message.sender === 'User'">{{ message.text }}</span>
            <span v-else class="typing-text" :ref="`typingText${index}`">{{ message.text }}</span>
          </span>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="userInput" type="text" placeholder="Type your message..." @keyup.enter="sendMessage" />
        <button @click="sendMessage">Dating Advice</button>
      </div>
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
    async typeMessage(text, elementRef) {
      const element = this.$refs[elementRef][0];
      element.textContent = '';
      const delay = 30; // Adjust typing speed (milliseconds per character)
      
      for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delay));
        element.textContent += text[i];
      }
    },

    async sendMessage() {
      if (this.userInput.trim() === "") return;

      // Add user message immediately
      this.chatMessages.push({ sender: "User", text: this.userInput });

      const predefinedPrompt =
        "You are a friendly and knowledgeable dating coach. Provide clear, actionable advice in 3-4 sentences. Include one specific example or explanation when relevant. Be direct but personable, while avoiding overly lengthy responses.";

      const prompt = `${predefinedPrompt}\n\nUser's situation: ${this.userInput}`;
      this.userInput = "";

      try {
        const result = await getGroqResponse(prompt);
        const messageIndex = this.chatMessages.length;
        this.chatMessages.push({ sender: "Rizz God", text: result });
        
        // Wait for Vue to update the DOM
        await this.$nextTick();
        // Start typing animation
        await this.typeMessage(result, `typingText${messageIndex}`);
      } catch (err) {
        this.error = err.message;
        console.log(this.error);
      }
    },
  },
};
</script>

<style scoped>
.nav-header {
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  height: 64px;
}

.logo-container, .logo-wrapper {
  display: flex;
  align-items: center;
  width: 100px;
}

.logo-image {
  aspect-ratio: 0.69;
  object-fit: contain;
  width: 64px;
  height: auto;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
}

.nav-item {
  border-radius: 8px;
  padding: 8px 16px;
  text-decoration: none;
  color: #1b263b;
  transition: all 0.2s ease;
}

.nav-item.active {
  background-color: #865a5a;
  color: #FFF;
}

.chat-button{
  background-color: rgba(27, 38, 59, 1);
  border-color: rgba(27, 38, 59, 1);;
  color: #ff6f61;
}

.explore-button{
  background-color: rgb(217, 204, 204);
}

.profile-button{
  background-color: rgba(27, 38, 59, 1);
  border-color: rgba(27, 38, 59, 1);
  border-radius: 100px;
}

.gradient-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #ff6f61 0%, #ffffff 100%);
  background-attachment: fixed;
  background-size: cover;
  z-index: -1;
}

.chat-page {
  position: relative;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.chat-container {
  width: 100%;
  height: 500px;
  max-height: 500px;
  margin: 0 auto;
  border: none;
  border-radius: 12px;
  padding: 20px;
  overflow-y: auto;
  background-color: rgba(245, 245, 245, 0.95);
  box-shadow: 0 8px 24px rgba(255, 111, 97, 0.15);
}

.chat-message {
  margin: 15px 0;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(235, 235, 235, 0.9);
  border: 1px solid rgba(255, 111, 97, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

.user-message {
  color: #ff6f61;
  font-weight: 500;
}

.bot-message {
  color: #333333;
}

.chat-input {
  display: flex;
  margin-top: 10px;
  gap: 10px;
  width: 100%;
}

.chat-input input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid rgba(245, 245, 245, 0.95);
  border-radius: 8px;
  background-color: rgba(245, 245, 245, 0.95);
  box-shadow: 0 2px 6px rgba(255, 111, 97, 0.1);
  transition: all 0.2s ease;
}

.chat-input input:focus {
  outline: none;
  border-color: #ff6f61;
  box-shadow: 0 2px 8px rgba(255, 111, 97, 0.2);
}

.chat-input input::placeholder {
  color: rgba(255, 111, 97, 0.6);
}

.chat-input button {
  padding: 12px 24px;
  border: none;
  background-color: #ff6f61;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(255, 111, 97, 0.2);
}

.chat-input button:hover {
  background-color: #ff8577;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.3);
}

.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 111, 97, 0.6);
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 111, 97, 0.8);
}

.typing-text {
  display: inline-block;
  min-height: 1em;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
