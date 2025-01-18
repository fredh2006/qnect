<template>
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
        location: "toronto", // Replace with dynamic user location if available
        userId: "678bf33511fd16bded398250", // Replace with actual logged-in user ID
        notification: "",
        currentIndex: 0,
      };
    },
    methods: {
      fetchPeopleByLocation() {
        axios
          .get(`http://localhost:3000/api/people/location/${this.location}`)
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
        axios
          .post(`http://localhost:3000/api/person/${this.userId}/like`, {
            likedId,
          })
          .then((response) => {
            if (response.data.success) {
              this.notification = "You liked someone!";
              setTimeout(() => {
                this.notification = "";
              }, 3000);
            } else {
              console.error("Error liking person:", response.data.message);
            }
          })
          .catch((error) => {
            console.error("Error liking person:", error);
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
  </style>
  