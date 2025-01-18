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
      <br>
      <br>
        <label for="password">Password</label>
        <input v-model="password" type="password" placeholder="********" name="password" />
      </div>
      <button type="submit" @click="register">Login</button>
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
    }
  },
  methods: {
    register() {
        sessionStorage.setItem('email', this.email)
        sessionStorage.setItem('password', this.password)
        this.$router.push('/profile')
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
  padding: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;

  h2 {
    margin: 0 0 20px 0;
  }

  input {
    width: 100%;
    padding: 15px;
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-family: inherit;
  }

  button {
    padding: 15px;
    background-color: #B3A0D1; /* Lavender */
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 15px;

    &:hover {
      background-color: #A7E6D7; /* Soft Mint */
    }
  }
}
</style>
