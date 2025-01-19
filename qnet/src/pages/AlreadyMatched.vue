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
            <a href="#" class="nav-item explore-button" role="menuitem" tabindex="0">Explore</a>
          </li>
          <li role="none">
            <a href="/chatbot" class="nav-item matches-button" role="menuitem" tabindex="0">Chatbot</a>
          </li>
          <li role="none">
            <a href="/dashboard" class="nav-item dashboard-button" role="menuitem" tabindex="0">Dashboard</a>
          </li>
          <li role="none">
            <a href="/yourprofile" class="nav-item-profile profile-button" role="menuitem" tabindex="0"><div style = "position: absolute; margin-left: 11px; font-weight: 700;">P</div></a>
          </li>
        </ul>
      </nav>
    </header>

    <main class="hero-section">
      <div class="matches-container">
        <h1 class="main-title">Your Matches</h1>
        
        <div class="matches-grid">
          <div v-for="(person, index) in matchedPeople" 
               :key="person._id" 
               class="match-card"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="card-content">
              <h3 class="card-title">{{ person.name }}</h3>
              
              <div class="info-grid">
                <div class="match-score">
                  <strong>Match Score</strong>
                  <div class="score">{{ person.matchScore }}%</div>
                  <div class="compatibility">
                    {{ getCompatibilityText(person.matchScore) }}
                  </div>
                </div>
                <div class="info-item">
                  <strong>Age</strong>
                  <p>{{ person.age }}</p>
                </div>
                <div class="info-item">
                  <strong>Location</strong>
                  <p>{{ person.location }}</p>
                </div>
              </div>

              <div class="about-section">
                <strong>About</strong>
                <p>{{ person.about }}</p>
              </div>

              <div class="questions-box">
                <h4 class="qna">Questions & Answers</h4>
                <div v-for="(answer, question) in person.questions" 
                     :key="question"
                     class="question-answer">
                  <strong>{{ question }}</strong>
                  <p>{{ answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
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
    goHome() {
      this.$router.push('/');
    },
    getCompatibilityText(score) {
      if (score >= 90) return "Exceptional Match!";
      if (score >= 80) return "Outstanding Compatibility";
      if (score >= 70) return "Great Connection";
      if (score >= 60) return "Good Match";
      return "Potential Match";
    },
  },
};
</script>

<style scoped>
.gradient-background {
  background: linear-gradient(135deg, #ff6f61, white);
  min-height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #ff6f61, white);
  min-height: calc(100vh - 64px);
  padding: 40px 24px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 0;
}

.matches-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  color: #1b263b;
  font-size: 42px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: -1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  padding: 20px;
}

.match-card {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.match-card:hover {
  transform: translateY(-4px);
}

.card-content {
  padding: 24px;
}

.card-title {
  color: #1b263b;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border: 1px solid rgba(27, 38, 59, 0.1);
}

.info-item {
  text-align: center;
}

.info-item strong {
  display: block;
  color: #ff6f61;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.info-item p {
  color: #1b263b;
  font-size: 1rem;
  margin: 0;
}

.about-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border: 1px solid rgba(27, 38, 59, 0.1);
}

.about-section strong {
  display: block;
  color: #ff6f61;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.questions-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.qna {
  color: #ff6f61;
  font-size: 1.2rem;
  margin-bottom: 16px;
  text-align: center;
  font-weight: 600;
}

.question-answer {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  background: white;
  border: 1px solid rgba(27, 38, 59, 0.1);
  transition: transform 0.2s ease;
}

.question-answer:hover {
  transform: translateX(4px);
  background: rgba(255, 111, 97, 0.05);
}

.question-answer strong {
  display: block;
  color: #1b263b;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.question-answer p {
  color: #1b263b;
  margin: 0;
  font-size: 0.9rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 32px;
    margin-bottom: 24px;
  }

  .matches-grid {
    grid-template-columns: 1fr;
    padding: 12px;
  }

  .card-content {
    padding: 20px;
  }

  .info-grid {
    gap: 12px;
    padding: 12px;
  }
}

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

.search-container {
  flex: 1;
  max-width: 400px;
  margin: 0 24px;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px 16px;
  border-radius: 20px;
  border: 2px solid rgba(255, 111, 97, 0.1);
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
  font-size: 0.95rem;
  color: #1b263b;
}

.search-input:focus {
  outline: none;
  border-color: #ff6f61;
  box-shadow: 0 0 0 4px rgba(255, 111, 97, 0.1);
}

.search-input::placeholder {
  color: rgba(27, 38, 59, 0.5);
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

/* Add this if you want a subtle indicator under non-active nav items on hover */
.nav-item:not(.active)::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ff6f61;
  transition: all 0.2s ease;
  transform: translateX(-50%);
}

.nav-item:not(.active):hover::after {
  width: 30px;
}

.dashboard-button {
    background-color: rgba(27, 38, 59, 1);
    border-color: rgba(27, 38, 59, 1);
    color: #ff6f61;
}

.chat-button {
  background-color: #ff6f61;
  border-color: #ff6f61;
  color: rgba(27, 38, 59, 1);
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

.match-score {
  grid-column: 1 / -1;
  text-align: center;
  padding: 20px;
  background: linear-gradient(45deg, #1b263b, #2d3f59);
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.match-score::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 111, 97, 0.1), rgba(255, 111, 97, 0.2));
  opacity: 0.5;
}

.match-score strong {
  display: block;
  color: #ff6f61;
  font-size: 0.9rem;
  margin-bottom: 8px;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.match-score .score {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff6f61;
  position: relative;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.match-score .compatibility {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #fff;
  opacity: 0.9;
  position: relative;
}
</style>
  