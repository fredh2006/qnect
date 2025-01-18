<template>
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
  <button type="submit" @click="register()">
    Register
  </button>
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
      questions: [
        "What does love mean to you?",
        "What is your happiest memory?",
        "If you could change one thing about the world, what would it be?",
        "What inspires you the most?",
        "What’s a belief you’ve always held?",
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
        "social_media": "@fredhe",
        "sexuality": this.sexuality,
        "gender": this.gender,
        "age": number_age,
        "location": this.location,
        "questions": QTA,
        "email": "test3",
        "password": "test",
        "matches": [],
        "likes": [],
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

</script>