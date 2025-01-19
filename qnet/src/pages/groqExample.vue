<template>
  <div class="gradient-background">
    <!-- NAVIGATION HEADER -->
    <header class="nav-header" role="banner">
      <nav class="nav-container" role="navigation" aria-label="Main navigation">
        <div class="logo-container">
          <div @click="goHome" class="logo-wrapper">
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
            <a href="/explore" class="nav-item explore-button" role="menuitem" tabindex="0"
              >Explore</a
            >
          </li>
          <li role="none">
            <a href="/matches" class="nav-item matches-button" role="menuitem" tabindex="0"
              >Matches</a
            >
          </li>
          <li role="none">
            <a href="/dashboard" class="nav-item dashboard-button" role="menuitem" tabindex="0"
              >Dashboard</a
            >
          </li>
          <li role="none">
            <a href="/yourprofile"
              class="nav-item-profile profile-button"
              role="menuitem"
              tabindex="0"
            >
              <div style="position: absolute; margin-left: 11px; font-weight: 700;">P</div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <!-- END NAV HEADER -->

    <!-- CHAT SECTION -->
    <div class="chat-page">
      <!-- The chat messages container -->
      <div class="chat-container">
        <div
          v-for="(message, index) in chatMessages"
          :key="index"
          class="chat-message"
        >
          <span :class="message.sender === 'User' ? 'user-message' : 'bot-message'">
            <strong>{{ message.sender }}: </strong>
            <!-- User message -->
            <span v-if="message.sender === 'User'">
              {{ message.text }}
            </span>
            <!-- Bot message with typing effect -->
            <span v-else class="typing-text" :ref="`typingText${index}`">
              {{ message.text }}
            </span>
          </span>
        </div>
      </div>

      <!-- Recorder & Chat Controls in one row or column -->
      <div class="chat-controls">
        <div class="recorder-section">
          <h2>Voice Recorder</h2>
          <button @click="startRecording" v-if="!isRecording">Start Recording</button>
          <button @click="stopRecording" v-else>Stop Recording</button>
          <button @click="uploadAudio" :disabled="!convertedAudio">Upload Recording</button>
          <button @click="fetchAudioData" :disabled="!convertedAudio">Receive Feedback</button>
        </div>

        <div class="chat-input">
          <input
            v-model="userInput"
            type="text"
            placeholder="Type your message..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Dating Advice</button>
        </div>
      </div>
    </div>
    <!-- END CHAT SECTION -->
  </div>
</template>

<script>
import axios from 'axios';
import { getGroqResponse } from '../groqClient'; // Adjust path as needed
import { getWaveBlob } from 'webm-to-wav-converter'; // npm i webm-to-wav-converter

export default {
  name: 'RizzCoachWithRecorder',
  data() {
    return {
      // CHAT DATA
      userInput: '',
      chatMessages: [],
      error: null,

      // RECORDER DATA
      isRecording: false,
      audioBlob: null,       // WebM blob
      convertedAudio: null,  // WAV blob (or Promise<Blob>)
      mediaRecorder: null,
      recordingId: null,
      audioChunks: [],
    };
  },
  mounted() {
    // Intro chat message
    this.chatMessages.push({
      sender: 'Rizz Bot',
      text: "Hi! I'm your dating coach, here to offer you personalized advice. Ask me anything about dating, relationships, or how to find the perfect partner!",
    });
  },
  methods: {
    // Go home (example)
    goHome() {
      this.$router.push('/');
    },

    // Typing effect for bot messages
    async typeMessage(text, elementRef) {
      const element = this.$refs[elementRef]?.[0];
      if (!element) return;

      element.textContent = '';
      const delay = 30; // ms per character

      for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        element.textContent += text[i];
      }
    },

    // Send chat message
    async sendMessage() {
      if (this.userInput.trim() === '') return;

      // 1. User message
      this.chatMessages.push({ sender: 'User', text: this.userInput });

      // 2. Bot context
      const predefinedPrompt =
        'You are a friendly and knowledgeable dating coach. Provide clear, actionable advice in 3-4 sentences. Include one specific example or explanation when relevant. Be direct but personable, while avoiding overly lengthy responses.';
      const prompt = `${predefinedPrompt}\n\nUser's situation: ${this.userInput}`;

      // Clear input
      this.userInput = '';

      try {
        // 3. Get bot response
        const result = await getGroqResponse(prompt);

        // 4. Add bot message
        const messageIndex = this.chatMessages.length;
        this.chatMessages.push({ sender: 'Rizz Bot', text: result });

        // 5. Typing animation
        await this.$nextTick();
        await this.typeMessage(result, `typingText${messageIndex}`);
      } catch (err) {
        this.error = err.message;
        console.error('Chat error:', err);
      }
    },

    // Recorder: Start
    async startRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.start();
        this.isRecording = true;

        // Collect data chunks
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.audioChunks.push(event.data);
          }
        };

        // On stop
        this.mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.audioBlob = audioBlob;
          this.audioChunks = []; // reset for next time

          // Stop the mic stream
          stream.getTracks().forEach((track) => track.stop());

          // Convert WebM to WAV
          this.convertedAudio = getWaveBlob(audioBlob, true);
          console.log('Converted Audio (Promise or Blob):', this.convertedAudio);
        };
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    },

    // Recorder: Stop
    stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },

    // Recorder: Upload
    async uploadAudio() {
      if (!this.convertedAudio) {
        alert('No recording to upload!');
        return;
      }

      // If getWaveBlob(...) returned a Promise, wait for the WAV blob
      const wavBlob = await this.convertedAudio;
      console.log('WAV Blob:', wavBlob);

      // Prepare form data
      const formData = new FormData();
      formData.append('title', 'Recorded Audio');
      formData.append('description', 'This is a test recording.');
      formData.append('file', wavBlob, 'recording.wav');
      formData.append('video_url', '');
      formData.append('start_time', '');
      formData.append('end_time', '');
      formData.append('bulk_upload_id', '');
      formData.append('callback_url', 'https://api.imentiv.ai/docs#/');

      try {
        // POST to local proxy or directly to iMentiv
        const response = await axios.post('/api/v1/audios', formData, {
          headers: {
            accept: 'application/json',
            'X-API-Key':
              '',
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Upload successful:', response.data);
        this.recordingId = response.data.id;
        alert('Audio uploaded successfully!');
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload audio!');
      }
    },
    async fetchAudioData() {
      try {
        const response = await axios.get(`/api/v1/audios/${this.recordingId}`, {
          headers: {
            'accept': 'application/json',
            'X-API-Key':
              '',
          }
        });

        // Retrieve the `emotions` field from the response
        const emotions = response.data.emotions;
        console.log('Emotions:', emotions);
        try {
        // 3. Get bot response
        const result = await getGroqResponse("Given the user's situation of emotions analyze their emotions"+JSON.stringify(emotions));

        // 4. Add bot message
        const messageIndex = this.chatMessages.length;
        this.chatMessages.push({ sender: 'Rizz Bot', text: result });

        // 5. Typing animation
        await this.$nextTick();
        await this.typeMessage(result, `typingText${messageIndex}`);
      } catch (err) {
        this.error = err.message;
        console.error('Chat error:', err);
      }
        // Do something with `emotions` ...
      } catch (error) {
        console.error('Error fetching audio data:', error.response?.data || error.message);
      }
    }
  },
};
</script>

<style scoped>
/* -----------------------------------
   NAV HEADER
----------------------------------- */
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

/* -----------------------------------
   MAIN BACKGROUND
----------------------------------- */
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

/* -----------------------------------
   CHAT STYLES
----------------------------------- */
.chat-page {
  position: relative;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding-top: 40px;
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

/* -----------------------------------
   CHAT CONTROLS (RECORDER + INPUT)
----------------------------------- */
.chat-controls {
  margin-top: 10px;
  display: flex;
  flex-direction: column; /* stack vertically */
  gap: 10px;
}

/* You can change to row if you prefer them side by side:
.chat-controls {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}
*/

.recorder-section {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(255, 111, 97, 0.2);
}

.chat-input {
  display: flex;
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
</style>
