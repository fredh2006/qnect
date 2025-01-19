<template>
  <div class="container">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="center">
      <h2>Login</h2>
      <div id="input">
        <label for="email">Email</label>
        <input v-model="email" type="email" placeholder="e.g. John Smith" name="email" />
      </div>
      <div id="input">
        <label class = "password" for="password">Password</label>
        <input class = "password" v-model="password" type="password" placeholder="********" name="password" />
      </div>
      <button type="submit" @click="login">Login</button>
      <div v-if="showError" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      showError: false, // Controls visibility of error message
      errorMessage: '', // Stores the error message to be displayed
    }
  },
  methods: {
    async login() {
      axios.get(`http://localhost:3000/api/person/email/${this.email}`)
    .then(response => {
      if (response.data.success) {
        console.log('User data:', response.data.person);
        if (this.password == response.data.person.password){
          console.log('logged in')
          this.$router.push('/dashboard')
          console.log(response.data.person)
          sessionStorage.setItem('userId', response.data.person._id);  // Save the user ID
          sessionStorage.setItem('location', response.data.person.location);
        }else{
          this.showError = true;
          this.errorMessage = "Wrong password";
        }
      } else {
        console.log('No user found with that email');
      }
    })
    .catch(err => {
      console.error('Error fetching user:', err);
    });
    }
  }
}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

*, *:before, *:after {
  box-sizing: border-box;
}
#input{
  width: 300px !important;
}
body {
  min-height: 100vh;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover, &:active {
    .top, .bottom {
      &:before, &:after {
        margin-left: 200px;
        transform-origin: -200px 50%;
        transition-delay: 0s;
      }
    }

    .center {
      opacity: 1;
      transition-delay: 0.2s;
    }
  }
}

.top, .bottom {
  &:before, &:after {
    content: '';
    display: block;
    position: absolute;
    width: 200vmax;
    height: 200vmax;
    top: 50%;
    left: 50%;
    margin-top: -100vmax;
    transform-origin: 0 50%;
    transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
    z-index: 10;
    opacity: 0.65;
    transition-delay: 0.2s;
  }
}

.top {
  &:before {
    transform: rotate(45deg);
    background: #FFF; /* Coral Red */
  }
  &:after {
    transform: rotate(135deg);
    background:#ff6c64; /* Soft Peach */
  }
}

.bottom {
  &:before {
    transform: rotate(-45deg);
    background: #ff6c64; /* Lavender */
  }
  &:after {
    transform: rotate(-135deg);
    background: #FFF;; /* Soft Mint */
  }
}

label {
    display: block;
    margin-top: 5px;
    font-weight: 600;
    color: #1b263b;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }

.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;


  h2 {
    font-size: 2rem;
    margin: 0 0 20px 0;
    font-weight: 800;
    letter-spacing: -1px;
    background: linear-gradient(45deg, #1b263b, #2d3f59);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #ff6f61, #ff8f7d);
      border-radius: 2px;
    }
  }

  input {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: 2px solid rgba(27, 38, 59, 0.1);
    font-family: inherit;
    font-size: 0.9rem;
    background: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);

    &:focus {
      outline: none;
      border-color: #ff6f61;
      box-shadow: 
        0 0 0 4px rgba(255, 111, 97, 0.1),
        inset 0 2px 4px rgba(0, 0, 0, 0.02);
    }

    &::placeholder {
      color: rgba(27, 38, 59, 0.4);
    }
  }

  button {
    width: 300px;
    padding: 8px;
    background: linear-gradient(45deg, #1b263b, #2d3f59);
    border: none;
    color: #ff6f61;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.05);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    margin-top: 15px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 8px 16px rgba(0, 0, 0, 0.15),
        0 4px 8px rgba(0, 0, 0, 0.1);
      background: linear-gradient(45deg, #2d3f59, #1b263b);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: 0.5s;
    }

    &:hover::before {
      left: 100%;
    }
  }
}
</style>
