<template>
    <div>
      <h1>Dating Coach</h1>
      <textarea v-model="userInput" placeholder="Type your dating situation or question here..."></textarea>
      <button @click="getDatingAdvice">Get Advice</button>
      <p v-if="response">Dating Advice: {{ response }}</p>
      <p v-if="error" class="error">Error: {{ error }}</p>
    </div>
  </template>
  
  <script>
  // Import the necessary methods from your code
  import { getGroqResponse } from "../groqClient";
  
  export default {
    data() {
      return {
        userInput: '',  // Holds the user's input
        response: null, // Holds the LLM's response
        error: null,    // Holds any errors that occur
      };
    },
    methods: {
      async getDatingAdvice() {
        // Predefined instruction for the LLM
        const predefinedPrompt = "Pretend you're a professional dating coach. You provide insightful and supportive advice on everything related to dating. Your advice should be thoughtful and applicable to various types of dating situations. When a user provides a prompt, respond with tips, strategies, or suggestions they can apply in their situation.";
  
        // Combine the predefined prompt with the user's input
        const prompt = `${predefinedPrompt}\n\nUser's situation: ${this.userInput}`;
        
        try {
          // Send the request to the language model API
          const result = await getGroqResponse(prompt);
          this.response = result; // Store the response from the LLM
        } catch (err) {
          this.error = err.message; // Store any errors
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
  