<template>
  <div>
    <header class="nav-header" role="banner">
      <nav class="nav-container" role="navigation" aria-label="Main navigation">
        <div class="logo-container">
          <div @click="goHome" class="logo-wrapper">
            <img loading="lazy" src="/public/qc_logo.png" class="logo-image" alt="Company Logo" />
          </div>
        </div>
      </nav>
    </header>

    <main class="hero-section">
      <div class="profile-container">
        <h1 class="main-title">Complete Your Profile</h1>
        
        <div class="profile-content">
          <div class="info-section">
            <div class="input-group">
              <label for="Name">Name</label>
              <input v-model="name" type="text" placeholder="Your full name" name="name" />
            </div>
            <div class="input-group">
              <label for="Sexuality">Sexuality</label>
              <input v-model="sexuality" type="text" placeholder="Your sexuality" name="sexuality" />
            </div>
            <div class="input-group">
              <label for="Gender">Gender</label>
              <input v-model="gender" type="text" placeholder="Your gender" name="gender" />
            </div>
            <div class="input-group">
              <label for="Age">Age</label>
              <input v-model="age" type="text" placeholder="Your age" name="age" maxlength="3" />
            </div>
            <div class="input-group">
              <label for="Location">Location</label>
              <input v-model="location" type="text" placeholder="Your location" name="location" />
            </div>
            <div class="input-group">
              <label for="About">About</label>
              <input v-model="about" type="text" placeholder="Tell us about yourself" name="about" />
            </div>
            <div class="input-group">
              <label for="social_media">Social Media</label>
              <input v-model="social_media" type="text" placeholder="Your social media handle" name="social_media" />
            </div>
          </div>

          <div class="questions-section">
            <h3 class="section-title">Personal Questions</h3>
            <div v-for="(item, index) in questionInputs" :key="index" class="question-box">
              <label for="question">Select a question:</label>
              <select v-model="item.selectedQuestion" name="question" id="question">
                <option value="" disabled>Select a question</option>
                <option v-for="(question, idx) in availableQuestions" :key="idx" :value="question">
                  {{ question }}
                </option>
              </select>

              <div v-if="item.selectedQuestion" class="answer-input">
                <label for="answer">Your Answer:</label>
                <input v-model="item.answer" type="text" id="answer" placeholder="Type your answer here" />
                <button class="submit-answer" @click="submitAnswer(index)">Submit Answer</button>
              </div>
            </div>

            <button v-if="canAddQuestion" class="add-question" @click="addQuestion">Add Question</button>

            <div v-if="Object.keys(answers).length" class="answers-display">
              <h3>Your Answers:</h3>
              <div class="answers-list">
                <div v-for="(answer, question) in answers" :key="question" class="answer-item">
                  <strong>{{ question }}</strong>
                  <p>{{ answer }}</p>
                </div>
              </div>
            </div>
          </div>

          <button class="primary-button" type="submit" @click="register">
            Complete Registration
          </button>
        </div>
      </div>
    </main>
  </div>
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
"What's something unconventional you believe about relationships?",
"What's a small gesture that makes you feel cared for?",
"How do you handle disagreements in a relationship?",
"What's a deal-breaker for you in a friendship or relationship?",
"What's one book, movie, or song that shaped your worldview?",
"How do you prioritize self-care in your life?",
"What's something you wish people asked about you more often?",
"What role does humor play in your life?",
"How do you typically express love or affection?",
"What's a recent moment that made you feel deeply alive?",
"What's more important: growth or comfort? Why?",
"How do you define success in life?",
"What's your approach to handling life's uncertainties?",
"How do you recharge after a long day?",
"What's one experience that changed your outlook on life?",
"What's a belief you've challenged and changed over time?",
"What does an ideal partnership look like to you?",
"What's a tradition or habit you've created that brings you joy?",
"How do you approach forgiveness in relationships?",
"What's one risk you've taken that shaped who you are?",
"What do you believe is humanity's greatest strength?",
"What's a topic you could talk about for hours?",
"How do you usually celebrate your victories, big or small?",
"What's your idea of a perfect first conversation with someone new?",
"What's one piece of advice that you try to live by?",
"What's a memory you revisit when you need to feel inspired?",
"How do you define kindness in action?",
"What role does spirituality or philosophy play in your life?",
"What's something you've done purely for the thrill of it?",
"How do you approach setting and achieving personal goals?",
"What's a question you wish people asked you more often?",
"How do you handle moments of self-doubt?",
"What's something simple that makes you feel at peace?",
"How do you navigate differences in opinions with someone you care about?",
"What's a belief or value you've held since childhood?",
"How do you balance independence and connection in a relationship?",
"What's a hobby or skill you'd love to learn and why?",


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
    canAddQuestion() {
      // Only show button if no questions have been added yet
      return this.questionInputs.length === 0;
    }
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

.logo-container, .logo-wrapper {
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

.hero-section {
  background: linear-gradient(135deg, #ff6f61, white);
  min-height: calc(100vh - 64px);
  padding: 40px 24px;
  overflow-y: auto;
}

.profile-container {
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

.profile-content {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.input-group:nth-child(n+6) {
  grid-column: span 2;
}

.section-title {
  color: #ff6f61;
  font-size: 1.8rem;
  margin: 32px 0;
  font-weight: 700;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #ff6f61, #ff8f7d);
  border-radius: 2px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1b263b;
  font-size: 0.95rem;
}

input, select {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid rgba(27, 38, 59, 0.1);
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: #ff6f61;
  box-shadow: 0 0 0 4px rgba(255, 111, 97, 0.1);
}

.question-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(27, 38, 59, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.question-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.answer-input {
  margin-top: 16px;
}

.submit-answer {
  width: 100%;
  padding: 12px;
  background: rgba(27, 38, 59, 1);
  border: none;
  color: #ff6f61;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.submit-answer:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #2d3f59;
}

.add-question {
  width: 100%;
  padding: 12px;
  background: rgba(27, 38, 59, 1);
  border: none;
  color: #ff6f61;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 24px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-question:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #2d3f59;
}

.add-question::before {
  content: '+';
  font-size: 1.2rem;
  font-weight: 700;
}

.answers-display {
  margin-top: 32px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.answers-display h3 {
  color: #ff6f61;
  font-size: 1.4rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.answer-item {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(27, 38, 59, 0.1);
  transition: transform 0.2s ease;
}

.answer-item:hover {
  transform: translateX(4px);
  background: rgba(255, 111, 97, 0.05);
}

.answer-item strong {
  color: #1b263b;
  display: block;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.answer-item p {
  color: #1b263b;
  line-height: 1.5;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem;
}

.primary-button {
  margin-top: 32px;
  background: linear-gradient(45deg, #1b263b, #2d3f59);
  box-shadow: 0 4px 15px rgba(27, 38, 59, 0.2);
  width: 100%;
  padding: 16px;
  color: #ff6f61;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(27, 38, 59, 0.3);
  background: linear-gradient(45deg, #2d3f59, #1b263b);
}

@media (max-width: 768px) {
  .info-section {
    grid-template-columns: 1fr;
  }

  .input-group:nth-child(n+6) {
    grid-column: span 1;
  }

  .profile-content {
    padding: 24px;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>

