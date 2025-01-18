<template>
    <div>
      <h1>Groq API Example</h1>
      <button @click="fetchGroqResponse">Get Response</button>
      <p v-if="response">Response: {{ response }}</p>
      <p v-if="error" class="error">Error: {{ error }}</p>
    </div>
  </template>
  
  <script>
  import { getGroqResponse } from "../groqClient";
  
  export default {
    data() {
      return {
        response: null,
        error: null,
      };
    },
    methods: {
      async fetchGroqResponse() {
        const prompt = "Explain the importance of fast language models";
        try {
          const result = await getGroqResponse(prompt);
          console.log("Groq API Response:", result);
          this.response = result;
        } catch (err) {
          console.error(err.message);
          this.error = err.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  