<template>
  <div>
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
        
        <div class="search-container">
          <input type="search" placeholder="Search" class="search-input">
        </div>
        
        <ul class="nav-links" role="menubar">
          <li role="none">
            <a href="#" class="nav-item explore-button" role="menuitem" tabindex="0">Explore</a>
          </li>
          <li role="none">
            <a href="/matches" class="nav-item active" role="menuitem" tabindex="0">Match</a>
          </li>
          <li role="none">
            <a href="/chatbot" class="nav-item chat-button" role="menuitem" tabindex="0">ChatBot</a>
          </li>
          <li role="none">
            <a href="/chatbot" class="nav-item profile-button" role="menuitem" tabindex="0"></a>
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
                  <h3 class = "qna">Questions & Answers:</h3>
                  <div v-for="(answer, question) in people[currentIndex].questions" 
                       :key="question" 
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
          <span v-for="(person, index) in people" 
                :key="person._id" 
                :class="['indicator', { active: currentIndex === index }]" 
                @click="goToIndex(index)">
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

.hero-section {
  background: linear-gradient(135deg, #ff6f61, white);
  min-height: calc(100vh - 64px);
  padding: 40px 24px;
}

.no-matches{
  text-align: center;
}

.matches-container {
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  color: rgba(27, 38, 59, 1);
  letter-spacing: -2.16px;
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
}

.card-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 48px;
  padding-right: 48px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-title {
  color: #ff6f61;
  font-size: 1.8rem;
  margin: 0;
  padding-left: 16px;
  font-weight: 600;
}

.info-grid {
  display: grid;
  gap: 5px;
  padding-left: 16px
}

.qna{
  color: #ff6f61;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.questions-box {
  background: rgba(239, 232, 232, 0.8);
  border-radius: 8px;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.question-answer {
  margin-bottom: 5px;
}

.primary-button {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background-color: rgba(27, 38, 59, 1);
  padding: 12px;
  border: 1px solid rgba(27, 38, 59, 1);
  color: #ff6f61;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 700;
}

.primary-button:hover {
  transform: translateY(-2px);
  outline: 2px solid #ff6f61;
  outline-offset: 2px;
}

.carousel-buttons {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  margin: 10px;
  
}

.carousel-arrow {
  background-color: #1b263b;
  color: #ff6f61;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.carousel-arrow:hover {
  transform: scale(1.1);
}

.indicator-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.indicator {
  width: 8px;
  height: 8px;
  background-color: rgba(27, 38, 59, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.indicator.active {
  background-color: #1b263b;
}

.notification {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #ff6f61;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  animation: fadeIn 0.3s ease-in-out;
}

.search-container {
  flex: 1;
  max-width: 400px;
  margin: 0 24px;
}

.search-input {
  width: 100%;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #ff6f61;
  box-shadow: 0 0 0 2px rgba(255, 111, 97, 0.1);
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

@media (max-width: 991px) {
  .matches-container {
    padding: 0 20px;
  }
  
  .card-container {
    padding: 20px;
  }
}
</style>
