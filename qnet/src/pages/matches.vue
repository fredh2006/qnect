<template>
     <div class="dashboard-layout">
    <aside class="sidebar">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8b11bede3620921516c0a3e35d8b5bab2338ed9ccb42824992b410b5b13f263?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
        class="logo"
        alt="Company logo"
      />
      <nav class="nav-menu">
        <a href="#" class="nav-item">Explore</a>
        <a href="#" class="nav-item">Matches</a>
        <a href="#" class="nav-item">ChatBot</a>
      </nav>
    </aside>
    
    <main class="main-content">
      <header class="search-bar">
        <input type="search" placeholder="search" class="search-input">
      </header>
      
      <h1 class="dashboard-title">Welcome</h1>
      
      <div class="matches-container">
      <h1 class="title">People Near You</h1>
      <div v-if="people.length === 0">No matches found in your area.</div>
      <div class="card-container">
        <transition
          name="fade"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div
            v-if="people.length > 0"
            class="card"
            :key="people[currentIndex]._id"
            :class="{ active: currentIndex === currentIndex }"
          >
            <div class="card-content">
              <h2 class="card-title">{{ people[currentIndex].name }}</h2>
              <p><strong>Age:</strong> {{ people[currentIndex].age }}</p>
              <p><strong>Gender:</strong> {{ people[currentIndex].gender }}</p>
              <p><strong>Location:</strong> {{ people[currentIndex].location }}</p>
              <div class="questions-box">
                <h3>Questions & Answers:</h3>
                <div
                  v-for="(answer, question) in people[currentIndex].questions"
                  :key="question"
                  class="question-answer"
                >
                  <p><strong>{{ question }}:</strong> {{ answer }}</p>
                </div>
              </div>
              <br>
              <button class="like-button" @click="likePerson(people[currentIndex]._id)">
                Like
              </button>
            </div>
          </div>
        </transition>
  
        <!-- Carousel Navigation (Buttons) -->
        <div class="carousel-buttons">
          <button
            class="carousel-arrow left-arrow"
            @click="moveCarousel('left')"
          >
            &#8592;
          </button>
          <button
            class="carousel-arrow right-arrow"
            @click="moveCarousel('right')"
          >
            &#8594;
          </button>
        </div>
      </div>
  
      <!-- Carousel Indicators below the card -->
      <div class="indicator-container">
        <span
          v-for="(person, index) in people"
          :key="person._id"
          :class="['indicator', { active: currentIndex === index }]"
          @click="goToIndex(index)"
        ></span>
      </div>
  
      <div v-if="notification" class="notification">{{ notification }}</div>
    </div>
    </main>
  </div>

    <div class="matches-container">
      <h1 class="title">People Near You</h1>
      <div v-if="people.length === 0">No matches found in your area.</div>
      <div class="card-container">
        <transition
          name="fade"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div
            v-if="people.length > 0"
            class="card"
            :key="people[currentIndex]._id"
            :class="{ active: currentIndex === currentIndex }"
          >
            <div class="card-content">
              <h2 class="card-title">{{ people[currentIndex].name }}</h2>
              <p><strong>Age:</strong> {{ people[currentIndex].age }}</p>
              <p><strong>Gender:</strong> {{ people[currentIndex].gender }}</p>
              <p><strong>Location:</strong> {{ people[currentIndex].location }}</p>
              <div class="questions-box">
                <h3>Questions & Answers:</h3>
                <div
                  v-for="(answer, question) in people[currentIndex].questions"
                  :key="question"
                  class="question-answer"
                >
                  <p><strong>{{ question }}:</strong> {{ answer }}</p>
                </div>
              </div>
              <br>
              <button class="like-button" @click="likePerson(people[currentIndex]._id)">
                Like
              </button>
            </div>
          </div>
        </transition>
  
        <!-- Carousel Navigation (Buttons) -->
        <div class="carousel-buttons">
          <button
            class="carousel-arrow left-arrow"
            @click="moveCarousel('left')"
          >
            &#8592;
          </button>
          <button
            class="carousel-arrow right-arrow"
            @click="moveCarousel('right')"
          >
            &#8594;
          </button>
        </div>
      </div>
  
      <!-- Carousel Indicators below the card -->
      <div class="indicator-container">
        <span
          v-for="(person, index) in people"
          :key="person._id"
          :class="['indicator', { active: currentIndex === index }]"
          @click="goToIndex(index)"
        ></span>
      </div>
  
      <div v-if="notification" class="notification">{{ notification }}</div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
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
  // POST request for liking the person
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
        
        // Post a fixed match score (e.g., 85%)
        this.postMatchScore(likedId, 85); // Change 85 to your desired score
      } else {
        console.error("Error liking person:", response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error liking person:", error);
    });
},

// Method to post match score
postMatchScore(likedId, matchScore) {
  axios
    .post(`http://localhost:3000/api/person/${this.userId}/matchscore`, {
      likedId,
      matchScore,
    })
    .then((response) => {
      if (response.data.success) {
        console.log("Match score posted successfully");
      } else {
        console.error("Error posting match score:", response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error posting match score:", error);
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
  .matches-container {
    padding: 20px;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  /* Ensure the card-container has relative positioning */
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: 3px solid #FF6C64; /* Outline around the card */
    border-radius: 8px;
    padding: 15px;
    background-color: #fff;
  }
  
  /* Card Content Styling */
  .card-content {
    padding: 20px;
  }
  
  /* Title and Text Styling */
  .card-title {
    font-size: 22px;
    color: #FF6C64;
  }
  
  /* Button Styling */
  .like-button {
    background-color: #FF6C64;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 50px; /* Circular button */
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .like-button:hover {
    background-color: #e55a4b;
  }
  
  /* Carousel Buttons */
  .carousel-buttons {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    padding:20px;
  }
  
  .carousel-arrow {
  
    background-color: #FF6C64;
    color: white;
    font-size: 24px;
    border: none;
    width: 50px; /* Set a fixed width */
    height: 50px; /* Set a fixed height */
    padding: 0; /* Remove padding */
    cursor: pointer;
    border-radius: 50%; /* Circular button */
    transition: background-color 0.3s ease;
    z-index: 1;
  }
  
  .carousel-arrow:hover {
    background-color: #e55a4b;
  }
  
  /* Indicator Styling */
  .indicator-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .indicator {
    width: 12px;
    height: 12px;
    background-color: #bbb;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .indicator.active {
    background-color: #FF6C64;
  }
  
  .indicator:hover {
    background-color: #e55a4b;
  }
  
  /* Fade transition */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .dashboard-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  min-height: 100vh;
  background-color: #ff6f61;
}
.sidebar {
  background-color: #ff6f61;
  padding: 2rem;
  border-right: 2px solid rgba(255, 255, 255, 0.2);
}
.logo {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 3rem;
}
.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin-top: 15vh;
  width: 100%;
}
.nav-item {
  color: white;
  text-decoration: none;
  font-size: 2.2rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 90%;
  text-align: center;
}
.main-content {
  padding: 2rem;
}
.search-bar {
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
}
.search-bar::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: -200px;
  right: -2rem;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.3);
}
.search-input {
  width: 100%;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1.6rem;
}
.search-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.dashboard-title {
  color: white;
  font-size: 3rem;
  margin-bottom: 2rem;
}
.profile-card {
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
.profile-info {
  text-align: center;
  margin-bottom: 1.5rem;
}
.profile-name {
  font-size: 1.8rem;
  margin-bottom: 0.05rem;
}
.profile-age {
  font-size: 1.4rem;
  margin-bottom: 0.05rem;
}
.profile-location {
  font-size: 1.4rem;
  margin-bottom: 0;
}
.questions {
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
}
.question {
  font-size: 1.5rem;
  margin: 0;
}
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
.action-buttons button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}
.reject-btn {
  background-color: #ff4444;
  color: white;
}
.bookmark-btn {
  background-color: white;
  border: 2px solid #666!important;
}
.accept-btn {
  background-color: #00C851;
  color: white;
}
  </style>
  