<template>
    <header class="nav-header" role="banner">
      <nav class="nav-container" role="navigation" aria-label="Main navigation">
        <div class="logo-container">
          <div @click="goHome" class="logo-wrapper">
            <img loading="lazy" src="/public/qc_logo.png" class="logo-image" alt="Company Logo" />
          </div>
        </div>

        <ul class="nav-links" role="menubar">
          <li role="none">
            <a href="/ourmission" class="nav-item explore-button" role="menuitem" tabindex="0">Our Mission</a>
          </li>
          <li role="none">
            <a href="/login" class="nav-item matches-button" role="menuitem" tabindex="0">Sign In</a>
          </li>
          <li role="none">
            <a href="/register" class="nav-item dashboard-button" role="menuitem" tabindex="0">Register</a>
          </li>
        </ul>
      </nav>
    </header>

  <main class="hero-section" role="main">
    <section class="content-wrapper">
      <h1 class="main-title">Qnect</h1>
      <p class="tagline">No Photos, Just Chemistry.</p>
    </section>
    <div class="action-wrapper">
      <button 
        class="primary-button bold-text" 
        @click="handleStart"
        tabindex="0"
        role="button"
        aria-label="Start Your Journey">
        Start Your Journey
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    handleStart() {
      this.$router.push('/register')
    },
    handleLog(){
      this.$router.push('/login')
    },
    handleRegister(){
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>

html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* Ensures body height aligns with viewport */
}

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
  background-color: #ff6f61;
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
  background-color: #ff6f61;
  border-color: #ff6f61;
  color: rgba(27, 38, 59, 1);
}

.explore-button {
  background-color: rgb(222, 205, 205);
  border-color: rgb(222, 205, 205);
}

.profile-button {
  background-color: rgba(27, 38, 59, 1);
  border-color: rgb(27, 38, 59);
  border-radius: 100px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  background: linear-gradient(135deg, #ff6f61, white);
  min-height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 0;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  animation: fadeInUp 1s ease-out;
}

.main-title {
  font-size: 72px;
  color: #1b263b;
  margin: 0;
  letter-spacing: -2px;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #1b263b, #ff6f61);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 24px;
  color: #1b263b;
  margin: 16px 0 0;
  font-weight: 500;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.3s forwards;
}

.action-wrapper {
  margin-top: 48px;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.6s forwards;
}

.primary-button {
  min-width: 200px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(45deg, #1b263b, #2d3f59);
  border: none;
  border-radius: 12px;
  color: #ff6f61;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(27, 38, 59, 0.2);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(27, 38, 59, 0.3);
  background: linear-gradient(45deg, #2d3f59, #1b263b);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-links {
  opacity: 0;
  animation: fadeIn 1s ease-out 0.9s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bold-text {
  font-weight: 700;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 48px;
  }
  
  .tagline {
    font-size: 20px;
  }
  
  .primary-button {
    min-width: 180px;
    padding: 14px 28px;
    font-size: 16px;
  }
}
</style>