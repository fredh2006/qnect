<template>
    <div class="page-container">
      <!-- Left sidebar (empty for now, as requested) -->
      <aside class="sidebar">
        <!-- future sidebar content -->
      </aside>
  
      <!-- Main content area -->
      <section class="main-content">
        <h1>Your Matches</h1>
        
        <!-- Grid of matched people cards -->
        <div class="matches-grid">
          <!-- Loop through matchedPeople and render a card for each -->
          <div
            v-for="(person, index) in matchedPeople"
            :key="person._id"
            class="match-card"
          >
            <h3>{{ person.name }}</h3>
            <p><strong>Age:</strong> {{ person.age }}</p>
            <p><strong>Location:</strong> {{ person.location }}</p>
            <p><strong>About:</strong> {{ person.about }}</p>
            <!-- Sample display of 'questions' -->
            <p>
              <strong>Questions:</strong><br />
              Favorite color: {{ person.questions.favorite_color }}<br />
              Hobbies: {{ person.questions.hobbies }}<br />
              Dream job: {{ person.questions.dream_job }}<br />
              Match Score: {{ person.matchScore }}
            </p>
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
        userId: sessionStorage.getItem('userId'),// sessionStorage.getItem('userId'), // example user ID
        matchedPeople: [],
      };
    },
    mounted() {
      // Example call to get the matched people list for the user
      this.fetchMatches();
    },
    methods: {
      async fetchMatches() {
        try {
          const response = await axios.get(`http://localhost:3000/api/person/${this.userId}/matches`);
          if (response.data.success) {
            console.log('Matches:', response.data);

            this.matchedPeople = response.data.matches.map(person => {
              const matchScore = person.matchScores[this.userId] || 0; // Default to 0 if not found
              return {
                ...person,
                matchScore,
              };
            });
              }
        } catch (error) {
          console.error('Error fetching matches:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Basic layout */
  .page-container {
    display: flex;
    min-height: 100vh;
  }
  
  /* Left sidebar */
  .sidebar {
    width: 250px;
    background-color: #f8f8f8;
    /* Add additional styles if needed */
  }
  
  /* Main content section */
  .main-content {
    flex: 1;
    padding: 20px;
  }
  
  .matches-grid {
    display: grid;
    /* 2 columns (or more, depending on screen width) */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  /* Each match card */
  .match-card {
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #ddd;
    padding: 16px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .match-card h3 {
    margin-top: 0;
    margin-bottom: 8px;
  }
  
  .match-card p {
    margin: 4px 0;
  }
  </style>
  