<template>
    <div class="chat-container">
      <!-- Message list -->
      <div class="chat-messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.senderId !== myUserId ? 'my-message' : 'other-message']"
        >
          <div class="message-content">
            <div class="sender-info">
              <strong>{{ msg.senderId }}</strong>
              <span class="timestamp">{{ formatDate(msg.timestamp) }}</span>
            </div>
            <div class="text">
              {{ msg.text }}
            </div>
          </div>
        </div>
      </div>
  
      <!-- Input + Send button -->
      <div class="chat-controls">
        <input
          v-model="message"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import { io } from 'socket.io-client';
  
  export default {
    name: "ChatPage",
    data() {
      return {
        socket: null,          // The Socket.IO client
        room: "someRoom",      // Example room name
        messages: [],          // Holds all chat messages
        message: "",           // Model for user's current message
        myUserId: null,     // YOUR unique user ID (replace with actual logic)
      };
    },
    mounted() {
      // 1. Connect to your Socket.IO server (adjust URL/port as needed)
      this.socket = io("http://localhost:3000");
  
      // 2. Join the specified room
      this.socket.emit("joinRoom", this.room);

      this.socket.on("connect", () => {
        this.myUserId = this.socket.id;
      });
  
      // 3. Listen for incoming messages
      this.socket.on("chatMessage", (data) => {
        // data = { senderId, msg, timestamp }
        this.messages.push({
          senderId: data.senderId,
          text: data.msg,
          timestamp: data.timestamp,
        });
      });
    },
    beforeUnmount() {
      // Disconnect socket when leaving the page
      if (this.socket) {
        this.socket.disconnect();
      }
    },
    methods: {
      sendMessage() {
        if (this.message.trim()) {
          // 4. Emit message with room info
          this.socket.emit("chatMessage", {
            room: this.room,
            msg: this.message,
            // You might also send your user ID from the client
            // so the server can broadcast it correctly
            senderId: this.myUserId,
          });
          // Clear input
          this.message = "";
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 40px auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    min-height: 600px;
    font-family: Arial, sans-serif;
  }
  
  /* The scrolling container for messages */
  .chat-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    border-bottom: 1px solid #ccc;
  }
  
  /* Each message wrapper */
  .message {
    max-width: 70%;
    margin-bottom: 12px;
  }
  
  /* MY messages: on the LEFT */
  .my-message {
    align-self: flex-start;
    background-color: #e0f7fa; /* light teal */
    border-radius: 12px 12px 12px 0;
    margin-right: auto;
  }
  
  /* OTHER users' messages: on the RIGHT */
  .other-message {
    align-self: flex-end;
    background-color: #fce4ec; /* light pink */
    border-radius: 12px 12px 0 12px;
    margin-left: auto;
  }
  
  /* Inner content of the message */
  .message-content {
    padding: 8px 12px;
    word-wrap: break-word;
  }
  
  /* Sender + timestamp (top of each bubble) */
  .sender-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 0.9em;
    color: #444;
  }
  
  /* Actual text of the message */
  .text {
    font-size: 1em;
  }
  
  /* Timestamp styling */
  .timestamp {
    font-size: 0.8em;
    color: #666;
  }
  
  /* The input area */
  .chat-controls {
    padding: 10px;
    display: flex;
    gap: 5px;
  }
  .chat-controls input {
    flex: 1;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .chat-controls button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #3f51b5;
    color: #fff;
    cursor: pointer;
  }
  .chat-controls button:hover {
    background-color: #303f9f;
  }
  </style>
  