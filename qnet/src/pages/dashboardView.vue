<template>
  <div>

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
            <a href="/matches" class="nav-item matches-button" role="menuitem" tabindex="0">Matches</a>
          </li>
          <li role="none">
            <a href="/chatbot" class="nav-item chat-button" role="menuitem" tabindex="0">ChatBot</a>
          </li>
          <li role="none">
            <a href="/yourprofile" class="nav-item-profile profile-button" role="menuitem" tabindex="0"><div style = "position: absolute; margin-left: 11px; font-weight: 700;">P</div></a>
          </li>
        </ul>
      </nav>
    </header>

    <main class="hero-section">
      <div class="matches-container">
        <h1 class="main-title">People Near You</h1>
        <div v-if="people.length === 0" class="no-matches">No matches found in your area. Where do you live??</div>
        <div class="card-container" v-if="people.length > 0">
          <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div class="card" :key="people[currentIndex]._id">
              <div class="card-content">
                <h2 class="card-title">{{ people[currentIndex].name }}</h2>
                <div class="info-grid">
                  <p><strong>Age:</strong> {{ people[currentIndex].age }}</p>
                  <p><strong>Gender:</strong> {{ people[currentIndex].gender }}</p>
                  <p><strong>Location:</strong> {{ people[currentIndex].location }}</p>
                </div>
                <div class="questions-box">
                  <h3 class="qna">Questions & Answers:</h3>
                  <div v-for="(answer, question) in people[currentIndex].questions" :key="question"
                    class="question-answer">
                    <p><strong>{{ question }}:</strong> {{ answer }}</p>
                  </div>
                </div>
                <button class="primary-button" @click="likePerson(people[currentIndex]._id)">
                  Like
                </button>
              </div>
            </div>
          </transition>

          <div class="carousel-buttons">
            <button class="carousel-arrow left-arrow" @click="moveCarousel('left')">&#8592;</button>
            <button class="carousel-arrow right-arrow" @click="moveCarousel('right')">&#8594;</button>
          </div>
        </div>

        <div class="indicator-container">
          <span v-for="(person, index) in people" :key="person._id"
            :class="['indicator', { active: currentIndex === index }]" @click="goToIndex(index)">
          </span>
        </div>

        <div v-if="notification" class="notification">{{ notification }}</div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { getGroqResponse } from '../groqClient';
export default {
  data() {
    return {
      people: [],
      location: sessionStorage.getItem('location'), // Replace with dynamic user location if available
      userId: sessionStorage.getItem('userId'), // Replace with actual logged-in user ID
      notification: "",
      currentIndex: 0,
    };
  },
  methods: {
    fetchPeopleByLocation() {
      axios
        .get(`http://localhost:3000/api/people/location/${this.location}/user/${this.userId}`)
        .then((response) => {
          if (response.data.success) {
            this.people = response.data.people;
          } else {
            console.error("Error fetching people:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching people:", error);
        });
    },
    likePerson(likedId) {
      // First, send the like request
      axios
        .post(`http://localhost:3000/api/person/${this.userId}/like`, {
          likedId,
        })
        .then((response) => {
          if (response.data.success) {
            this.notification = "You liked someone!";

            // Remove the liked person from the carousel
            this.people = this.people.filter(person => person._id !== likedId);

            // Adjust the currentIndex to stay within bounds
            if (this.currentIndex >= this.people.length) {
              this.currentIndex = Math.max(0, this.people.length - 1);
            }

            // Clear notification after 3 seconds
            setTimeout(() => {
              this.notification = "";
            }, 3000);
            console.log('Calling checkMutualLike...');

            // Check if the other person has also liked this user (Mutual Like)
            this.checkMutualLike(likedId);
          } else {
            console.error("Error liking person:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error liking person:", error);
        });
    },

    // Method to check if both users liked each other
    async checkMutualLike(likedId) {
      console.log(`Checking mutual like for userId: ${this.userId}, likedId: ${likedId}`);
      try {
        const response = await axios.get(`http://localhost:3000/api/person/${likedId}/likes/${this.userId}`);

        if (response.data.success && response.data.likedByUser) {
          // If the other user has also liked the current user, post the match score
          const similarityScore = await this.calculateSimilarityScore(this.userId, likedId); // Now it works
          this.postMatchScore(likedId, similarityScore); // Post the match score for both users
        }
      } catch (error) {
        console.error("Error checking mutual like:", error);
      }
    },


    // Method to calculate similarity score (for now it's a fixed value, can be dynamic)
    async calculateSimilarityScore(user1Id, user2Id) {
      try {
        console.log("sim called")
        // Fetch the users' questions and answers from the backend
        const user1Response = await axios.get(`http://localhost:3000/api/person/${user1Id}`);
        const user2Response = await axios.get(`http://localhost:3000/api/person/${user2Id}`);

        const user1 = user1Response.data.person;
        const user2 = user2Response.data.person;

        if (!user1 || !user2) {
          throw new Error("One or both users not found");
        }

        // Combine both users' questions and answers into a single prompt
        const user1Data = Object.entries(user1.questions)
          .map(([question, answer]) => `Q: ${question}\nA: ${answer}`)
          .join("\n");

        const user2Data = Object.entries(user2.questions)
          .map(([question, answer]) => `Q: ${question}\nA: ${answer}`)
          .join("\n");

        console.log("User 1 Data:", user1Data);
        console.log("User 2 Data:", user2Data);
        // Construct the prompt for Groq API
        const prompt = `Calculate the compatibility score in terms of dating between these two users based on their answers to the following questions. ONLY RETURN A NUMBER DO NOT RETURN ANYTHING ELSE JUST ONE NUMBER ON A SCALE FROM 1-100\n\nUser 1's responses:\n${user1Data}\n\nUser 2's responses:\n${user2Data}`;

        console.log("Sending prompt to Groq API:", prompt);
        // Send the request to Groq API
        const similarityScore = await getGroqResponse(prompt);

        console.log("Groq API response:", similarityScore);
        // Return the similarity score (e.g., 0-100 scale)
        return parseInt(similarityScore);
      } catch (error) {
        console.error("Error calculating similarity score:", error);
        throw error;  // Propagate the error if needed
      }
    },

    // Method to post match score for both users
    postMatchScore(matchId, score) {
      axios
        .post(`http://localhost:3000/api/person/${this.userId}/matchscore`, {
          matchId,
          score,
        })
        .then((response) => {
          if (response.data.success) {
            console.log("Match score posted successfully for user:", this.userId);
          } else {
            console.error("Error posting match score for user:", this.userId);
          }
        })
        .catch((error) => {
          console.error("Error posting match score for user:", this.userId);
        });

      // Also post the score for the liked person
      axios
        .post(`http://localhost:3000/api/person/${matchId}/matchscore`, {
          matchId: this.userId,
          score,
        })
        .then((response) => {
          if (response.data.success) {
            console.log("Match score posted successfully for user:", matchId);
          } else {
            console.error("Error posting match score for user:", matchId);
          }
        })
        .catch((error) => {
          console.error("Error posting match score for user:", matchId);
        });
    },



    moveCarousel(direction) {
      if (direction === "left") {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.people.length - 1; // Loop to the last person
        }
      } else if (direction === "right") {
        if (this.currentIndex < this.people.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0; // Loop to the first person
        }
      }
    },
    goToIndex(index) {
      this.currentIndex = index;
    },

    // Transition hooks
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.display = "block";
    },
    enter(el, done) {
      el.offsetHeight; // trigger reflow to apply transition
      el.style.transition = "opacity 0.5s ease-in-out";
      el.style.opacity = 1;
      done();
    },
    leave(el, done) {
      el.style.transition = "opacity 0.5s ease-in-out";
      el.style.opacity = 0;
      done();
    },
  },
  mounted() {
    this.fetchPeopleByLocation();
  },
};

</script>

<style scoped>
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
  border-radius: 100px;
  color: white;
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
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  color: #1b263b;
  font-size: 42px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: -1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.card-container {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 32px;
}

.card-title {
  color: #1b263b;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  border: 1px solid rgba(27, 38, 59, 0.1);
}

.info-grid p {
  text-align: center;
  color: #1b263b;
  font-size: 0.95rem;
}

.info-grid strong {
  display: block;
  color: #ff6f61;
  margin-bottom: 4px;
  font-size: 1rem;
}

.questions-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.qna {
  color: #ff6f61;
  font-size: 1.4rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.question-answer {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: white;
  border: 1px solid rgba(27, 38, 59, 0.1);
  transition: transform 0.2s ease;
}

.question-answer:hover {
  transform: translateX(4px);
  background: rgba(255, 111, 97, 0.05);
}

.carousel-buttons {
  position: absolute;
  top: 50%;
  left: -24px;
  right: -24px;
  display: flex;
  justify-content: space-between;
  padding: 0;
  transform: translateY(-50%);
  z-index: 2;
}

.carousel-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(45deg, #1b263b, #2d3f59);
  color: #ff6f61;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
}

.carousel-arrow:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.indicator-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(27, 38, 59, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #ff6f61;
  transform: scale(1.2);
}

.primary-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(45deg, #1b263b, #2d3f59);
  border: none;
  border-radius: 12px;
  color: #ff6f61;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 24px;
  box-shadow: 0 4px 15px rgba(27, 38, 59, 0.2);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(27, 38, 59, 0.3);
  background: linear-gradient(45deg, #2d3f59, #1b263b);
}

.notification {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: linear-gradient(45deg, #ff6f61, #ff8f7d);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.no-matches {
  text-align: center;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 32px;
    margin-bottom: 24px;
  }

  .card-container {
    padding: 20px;
  }

  .card-content {
    padding: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .carousel-arrow {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .carousel-buttons {
    left: -12px;
    right: -12px;
  }
}
</style>
