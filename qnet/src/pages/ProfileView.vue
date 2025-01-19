<template>
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
                
        <ul class="nav-links" role="menubar">
          <li role="none">
            <a href="#" class="nav-item explore-button" role="menuitem" tabindex="0">Our Mission</a>
          </li>
          <li role="none">
            <a href="/login" class="nav-item active" role="menuitem" tabindex="0">Log In</a>
          </li>
          <li role="none">
            <a href="/register" class="nav-item chat-button" role="menuitem" tabindex="0">Register</a>
          </li>
        </ul>
      </nav>
    </header>
    
   <main class="hero-section">
    <h1>Please Complete Your Profile</h1>
    <br>
    <br>
  <div>
    <label for="Name">Name</label>
    <input v-model="name" type="text" placeholder="e.g. John Smith" name="name" />
  </div>
  <div>
    <label for="Sexuality">Sexuality</label>
    <input v-model="sexuality" type="text" placeholder="e.g. John Smith" name="sexuality" />
  </div>
  <div>
    <label for="Gender">Gender</label>
    <input v-model="gender" type="text" placeholder="e.g. John Smith" name="gender" />
  </div>
  <div>
    <label for="Age">Age</label>
    <input v-model="age" type="text" placeholder="e.g. John Smith" name="age" maxlength="3" />
  </div>
  <div>
    <label for="Location">Location</label>
    <input v-model="location" type="text" placeholder="e.g. John Smith" name="location" />
  </div>
  <div>
    <label for="About">About</label>
    <input v-model="about" type="text" placeholder="e.g. John Smith" name="about" />
  </div>
  <div>
    <label for="social_media">Social Media</label>
    <input v-model="social_media" type="text" placeholder="e.g. John Smith" name="social_media" />
  </div>
  <div>
    <!-- Display previously added questions with answers -->
    <div v-for="(item, index) in questionInputs" :key="index" class="question-input">
      <label for="question">Select a question:</label>
      <select v-model="item.selectedQuestion" name="question" id="question">
        <option value="" disabled>Select a question</option>
        <option v-for="(question, idx) in availableQuestions" :key="idx" :value="question">
          {{ question }}
        </option>
      </select>

      <div v-if="item.selectedQuestion">
        <label for="answer">Your Answer:</label>
        <input v-model="item.answer" type="text" id="answer" placeholder="Type your answer here" />
        <button @click="submitAnswer(index)">Submit Answer</button>
      </div>
    </div>

    <!-- Add question button -->
    <button @click="addQuestion">Add Question</button>

    <!-- Display all answered questions -->
    <div v-if="Object.keys(answers).length">
      <h3>Your Answers:</h3>
      <ul>
        <li v-for="(answer, question) in answers" :key="question">
          <strong>{{ question }}</strong>: {{ answer }}
        </li>
      </ul>
    </div>
  </div>
  <div>
  <button  id= "register" type="submit" @click="register()">
    Register
  </button>
</div>
</main>
</template>

<script>
import axios from 'axios'
import { reactive, toRaw } from "vue";

export default {
  data() {
    return {
      name: '',
      sexuality: '',
      gender: '',
      age: '',
      location: '',
      about: '',
      social_media: '',
      questions: [
"What does love mean to you in one sentence?",
"Which values do you hold above all else?",
"How do you like to spend a perfect Sunday?",
"What’s something unconventional you believe about relationships?",
"What’s a small gesture that makes you feel cared for?",
"How do you handle disagreements in a relationship?",
"What’s a deal-breaker for you in a friendship or relationship?",
"What’s one book, movie, or song that shaped your worldview?",
"How do you prioritize self-care in your life?",
"What’s something you wish people asked about you more often?",
"What role does humor play in your life?",
"How do you typically express love or affection?",
"What’s a recent moment that made you feel deeply alive?",
"What’s more important: growth or comfort? Why?",
"How do you define success in life?",
"What’s your approach to handling life’s uncertainties?",
"How do you recharge after a long day?",
"What’s one experience that changed your outlook on life?",
"What’s a belief you’ve challenged and changed over time?",
"What does an ideal partnership look like to you?",
"What’s a tradition or habit you’ve created that brings you joy?",
"How do you approach forgiveness in relationships?",
"What’s one risk you’ve taken that shaped who you are?",
"What do you believe is humanity’s greatest strength?",
"What’s a topic you could talk about for hours?",
"How do you usually celebrate your victories, big or small?",
"What’s your idea of a perfect first conversation with someone new?",
"What’s one piece of advice that you try to live by?",
"What’s a memory you revisit when you need to feel inspired?",
"How do you define kindness in action?",
"What role does spirituality or philosophy play in your life?",
"What’s something you’ve done purely for the thrill of it?",
"How do you approach setting and achieving personal goals?",
"What’s a question you wish people asked you more often?",
"How do you handle moments of self-doubt?",
"What’s something simple that makes you feel at peace?",
"How do you navigate differences in opinions with someone you care about?",
"What’s a belief or value you’ve held since childhood?",
"How do you balance independence and connection in a relationship?",
"What’s a hobby or skill you’d love to learn and why?",


      ],
      answers: {}, // Stores all answered questions
      questionInputs: [],
      questionsToAnswers: {},
    }
  },
  computed: {
    availableQuestions() {
      // Exclude already answered questions from the dropdown
      return this.questions.filter((question) => !this.answers[question]);
    },
  },
  methods: {
    addQuestion() {
      // Add a new question input
      this.questionInputs.push({
        selectedQuestion: "",
        answer: "",
      });
    },
    submitAnswer(index) {
      const item = this.questionInputs[index];
      if (item.selectedQuestion && item.answer) {
        // Save the answer directly (no need for $set)
        this.answers[item.selectedQuestion] = item.answer;

        this.questionsToAnswers[item.selectedQuestion] = item.answer

        // Reset the selected question and answer
        item.selectedQuestion = "";
        item.answer = "";
      } else {
        alert("Please select a question and provide an answer.");
      }
    },
    register() {
  var QTA = (toRaw(this.questionsToAnswers))

  var number_age = Number(this.age)
  let data = JSON.stringify({
    "name": this.name,
    "about": this.about,
    "social_media": this.social_media,
    "sexuality": this.sexuality,
    "gender": this.gender,
    "age": number_age,
    "location": this.location,
    "questions": QTA,
    "email": sessionStorage.getItem('email'),
    "password": sessionStorage.getItem('password'),
    "matches": [],
    "likes": [],
    "matchScores": []
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/person/',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));

      // Store the user ID in sessionStorage
      if (response.data && response.data.personId) {
        sessionStorage.setItem('userId', response.data.personId);  // Save the user ID
        sessionStorage.setItem('location', this.location);
      }
      this.$router.push('/dashboard');
    })
    .catch((error) => {
      console.log(error);
    });
}
  }
}

</script>
<style scoped>

.nav-header {
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
}
.hero-section h1 {
  font-size: 3rem; /* Makes the text larger */
  font-weight: bold; /* Makes the text bold */
  text-align: left; /* Aligns the text to the left */
  width: 100%; /* Ensure it takes full width of its container */
  margin: 0; /* Remove any default margin */
  padding-left: 20px; /* Adds space from the left */
  color: #1b263b; /* Optional: Customize the text color */
  font-size: 26px;
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
.hero-section {
  background: linear-gradient(135deg, #ff6f61, white);
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Enable vertical scrolling */
}

.hero-section > div {
  width: 95%; /* Slightly larger width */
  max-width: 400px; /* Increase max width */
  background: white;
  border-radius: 12px;
  padding: 16px; /* Increase padding */
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* Add more spacing between containers */
}

input, select {
  padding: 10px 14px; /* Slightly larger padding */
  font-size: 1rem; /* Larger font size */
  border: 1px solid #d9d9d9;
  border-radius: 8px; /* Keep a smooth border */
  background-color: #fff;
  color: #333;
  width: 100%; /* Full width */
  margin-bottom: 16px; /* Add more space between inputs */
  transition: all 0.3s ease;
}

input:focus, select:focus {
  border-color: #ff6f61;
  outline: none;
  box-shadow: 0 0 6px rgba(255, 111, 97, 0.6);
}

label {
  font-weight: bold;
  color: #1b263b;
  font-size: 0.875rem; /* Slightly larger label size */
  margin-bottom: 8px;
  display: block;
}

button {
  background-color: #ff6f61;
  color: white;
  padding: 10px 16px; /* Larger button size */
  border: none;
  border-radius: 8px;
  font-size: 1rem; /* Increase font size */
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Full width for buttons */
  margin-bottom: 16px;
}

button:hover {
  background-color: #e85a4f;
}

.question-input {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* More spacing between question containers */
}

.question-input select {
  width: 100%;
}

.question-input input {
  margin-top: 8px;
  padding: 10px 14px; /* Match input padding */
}

.question-input button {
  background-color: #865a5a;
  border: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
  color: #fff;
}

.question-input button:hover {
  background-color: #744c4c;
}

button[type="submit"] {
  background-color: #1b263b;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 16px;
}

button[type="submit"]:hover {
  background-color: #465f7c;
}

/* Scroll behavior for long content */
.hero-section {
  height: 100vh; /* Ensure it fills the viewport */
  overflow-y: auto; /* Enable scrolling */
  scroll-behavior: smooth;
}

/* Adjust for smaller screens */
@media (max-width: 991px) {
  .hero-section > div {
    max-width: 360px; /* Adjust for medium screens */
  }
}

@media (max-width: 768px) {
  .hero-section > div {
    max-width: 320px; /* Adjust for smaller screens */
  }
}
</style>

