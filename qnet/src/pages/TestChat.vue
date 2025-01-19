<template>
  <div class="gradient-background">
    <header class="nav-header" role="banner">
      <nav class="nav-container" role="navigation" aria-label="Main navigation">
        <div class="logo-container">
          <div @click="goHome" class="logo-wrapper">
            <img loading="lazy" src="/public/qc_logo.png" class="logo-image" alt="Company Logo" />
          </div>
        </div>

        <ul class="nav-links" role="menubar">
          <li role="none">
            <a href="/explore" class="nav-item explore-button" role="menuitem" tabindex="0">Explore</a>
          </li>
          <li role="none">
            <a href="/matches" class="nav-item matches-button" role="menuitem" tabindex="0">Matches</a>
          </li>
          <li role="none">
            <a href="/dashboard" class="nav-item dashboard-button" role="menuitem" tabindex="0">Dashboard</a>
          </li>
          <li role="none">
            <a href="/yourprofile" class="nav-item-profile profile-button" role="menuitem" tabindex="0">
              <div style="position: absolute; margin-left: 11px; font-weight: 700;">P</div>
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <div class="chat-page">
      <div class="chat-container">
        <div class="chat-messages" ref="chatMessages">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.senderId === myUserId ? 'other-message' : 'my-message']"
          >
            <div class="message-content">
              <div class="sender-info">
                <strong>{{ msg.name }}</strong>
                <span class="timestamp">{{ formatDate(msg.timestamp) }}</span>
              </div>
              <div class="text">{{ msg.text }}</div>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <input
            v-model="message"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type your message..."
          />
          <button @click="sendMessage" class="send-button">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: "ChatPage",
  data() {
    return {
      socket: null,
      room: "someRoom",
      messages: [],
      message: "",
      myUserId: null,
      counter: 0,
    };
  },
  mounted() {
    this.socket = io("http://localhost:3000");
    this.socket.emit("joinRoom", this.room);
    
    this.socket.on("connect", () => {
      this.myUserId = this.socket.id;
    });

    this.socket.on("chatMessage", (data) => {
      var temp = '';
      if(this.counter % 2 == 0){
        console.log(this.counter)
        temp = 'Fred He';
        this.counter += 1;
      } else {
        this.counter += 1;
        temp = 'Madison Lam';
      }
      this.messages.push({
        senderId: data.senderId,
        name: temp,
        text: data.msg,
        timestamp: data.timestamp,
      });
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    });
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        this.socket.emit("chatMessage", {
          room: this.room,
          msg: this.message,
          senderId: this.myUserId,
        });
        this.message = "";
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    scrollToBottom() {
      const container = this.$refs.chatMessages;
      container.scrollTop = container.scrollHeight;
    },
    goHome() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.gradient-background {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6f61, white);
}

.chat-page {
  padding: 40px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.chat-container {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  max-width: 70%;
  margin-bottom: 12px;
  position: relative;
  animation: fadeIn 0.3s ease;
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

.my-message {
  align-self: flex-start;
  margin-left: 12px;
}

.other-message {
  align-self: flex-end;
  margin-right: 12px;
}

.message-content {
  padding: 12px 16px;
  border-radius: 20px;
  word-wrap: break-word;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.my-message .message-content {
  background: linear-gradient(135deg, #1b263b, #2d3f59);
  color: white;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(27, 38, 59, 0.15);
}

.other-message .message-content {
  background: linear-gradient(135deg, #ff6f61, #ff8a7f);
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 2px 8px rgba(255, 111, 97, 0.15);
}

.my-message .message-content::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: -8px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #1b263b, #2d3f59);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

.other-message .message-content::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: -8px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #ff6f61, #ff8a7f);
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}

.my-message .sender-info strong {
  color: white;
  opacity: 0.9;
}

.other-message .sender-info strong {
  color: white;
  opacity: 0.9;
}

.my-message .timestamp {
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.7);
}

.other-message .timestamp {
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.7);
}

.text {
  line-height: 1.4;
  font-size: 0.95rem;
}

.chat-input {
  padding: 20px;
  background: white;
  border-top: 1px solid rgba(27, 38, 59, 0.1);
  display: flex;
  gap: 12px;
}

.chat-input input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid rgba(27, 38, 59, 0.1);
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.chat-input input:focus {
  outline: none;
  border-color: #ff6f61;
  box-shadow: 0 0 0 4px rgba(255, 111, 97, 0.1);
}

.send-button {
  padding: 12px 24px;
  background: linear-gradient(45deg, #1b263b, #2d3f59);
  border: none;
  border-radius: 12px;
  color: #ff6f61;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.send-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(27, 38, 59, 0.2);
}

/* Navigation styles */
.nav-header {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(255, 111, 97, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-container,
.logo-wrapper {
  display: flex;
  align-items: center;
  width: 100px;
  transition: transform 0.2s ease;
}

.logo-wrapper:hover {
  transform: scale(1.05);
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
  font-weight: 500;
  position: relative;
  background: transparent;
}

.nav-item-profile {
  border-radius: 8px;
  padding: 8px 16px;
  text-decoration: none;
  color: #1b263b;
  transition: all 0.2s ease;
  font-weight: 500;
  position: relative;
  background: transparent;
}

.nav-item:hover {
  color: #ff6f61;
  background: rgba(255, 111, 97, 0.1);
}

.matches-button {
  background: #ff6f61;
  color: white;
}

.dashboard-button {
  background-color: rgba(27, 38, 59, 1);
  border-color: rgba(27, 38, 59, 1);
  color: #ff6f61;
}

.explore-button {
  background-color: rgb(222, 205, 205);
  border-color: rgb(222, 205, 205);
}

.profile-button {
  background-color: rgba(27, 38, 59, 1);
  border-color: rgb(27, 38, 59);
  border-radius: 1000px;
  color: white;
}
</style>
  