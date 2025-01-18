<template>
    <div class="page-container">
      <!-- Left sidebar (empty for now) -->
      <aside class="sidebar">
        <!-- Add sidebar content here if needed -->
      </aside>
  
      <!-- Main content area -->
      <section class="main-content">
        <h1>User Matches</h1>
  
        <!-- If user or matches haven't loaded yet -->
        <div v-if="!user">
          Loading user information...
        </div>
        <div v-else-if="matchesData.length === 0">
          No matches found.
        </div>
        <div v-else class="matches-grid">
          <!-- Loop through each matched user -->
          <div
            v-for="(match, index) in matchesData"
            :key="match._id"
            class="match-card"
          >
            <h3>{{ match.name }}</h3>
            <p>{{ match.age }} - {{ match.location }}</p>
            <p>Similarity Score: {{ similarityScores[match._id] || 'Calculating...' }}</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MatchesPage',
    data() {
      return {
        userId: '678c1eda8c35fae90dcfc8d7', // For example, or pass it via props/route
        user: null,
        matchesData: [],
        similarityScores: {}, // object keyed by match user _id
      };
    },
    async mounted() {
      try {
        // 1. Fetch current user data
        //    Replace '/api/user/...' with your actual endpoint
        const userResponse = await axios.get(`/api/user/${this.userId}`);
        this.user = userResponse.data;
  
        // 2. If user has matches, fetch each matched user’s info
        if (this.user && this.user.matches && this.user.matches.length) {
          const matchRequests = this.user.matches.map((matchId) => {
            return axios.get(`/api/user/${matchId}`);
          });
  
          const matchResponses = await Promise.all(matchRequests);
          this.matchesData = matchResponses.map((res) => res.data);
  
          // 3. For each matched user, call GROQ-based similarity endpoint
          for (let match of this.matchesData) {
            const similarityResponse = await axios.post('/api/groq-similarity', {
              userQuestions: this.user.questions,
              matchQuestions: match.questions
            });
            // Store the returned similarity score
            this.similarityScores[match._id] = similarityResponse.data.score;
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Basic layout styling */
  .page-container {
    display: flex;
    min-height: 100vh;
  }
  
  /* Left sidebar */
  .sidebar {
    width: 250px;
    background-color: #f8f8f8;
    /* Add any additional sidebar styles here */
  }
  
  /* Main content */
  .main-content {
    flex: 1;
    padding: 20px;
  }
  
  /* Grid for matches – 2 columns on larger screens */
  .matches-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  /* Match card styling */
  .match-card {
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #ddd;
    padding: 16px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  </style>
  