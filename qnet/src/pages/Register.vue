<template>
    <div class="container">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="center">
        <h2>Sign Up</h2>
        <div>
          <label for="email">Email</label>
          <input v-model="email" type="email" placeholder="e.g. John Smith" name="email" />
        </div>
        <div>
        <br>
        <br>
          <label for="password">Password</label>
          <input v-model="password" type="password" placeholder="********" name="password" />
        </div>
        <button type="submit" @click="register">Register</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      register() {
        const axios = require('axios');
        let data = JSON.stringify({
          "email": this.email,
          "password": this.password,
        });
  
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/api/person',
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
  
  <style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Raleway:400,700');
  
  *, *:before, *:after {
    box-sizing: border-box;
    margin-left:-10px;
    margin-top:-10px;
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
      background: #e46569;
    }
    &:after {
      transform: rotate(135deg);
      background: #ecaf81;
    }
  }
  
  .bottom {
    &:before {
      transform: rotate(-45deg);
      background: #60b8d4;
    }
    &:after {
      transform: rotate(-135deg);
      background: #3745b5;
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
      background-color: #60b8d4;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px;
      margin-top: 15px;
  
      &:hover {
        background-color: #3745b5;
      }
    }
  }
  </style>
  