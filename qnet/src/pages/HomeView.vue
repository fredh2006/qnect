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
            <a href="#" class="nav-item explore-button" role="menuitem" tabindex="0">Our Mission</a>
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
  justify-content: flex-start;
  padding: 160px 24px;
  background: linear-gradient(135deg, #ff6f61, white);
  height: 100vh; /* Takes up the full viewport height */
  box-sizing: border-box; /* Ensures padding is included in the height calculation */
}

.content-wrapper {
  display: flex;
  width: 412px;
  max-width: 100%;
  flex-direction: column;
  text-align: center;
  line-height: 1.2;
}

.main-title {
  color: var(--Accent, #ff6f61);
  letter-spacing: -2.16px;
  font: var(--sds-typography-title-hero-font-weight)
    var(--sds-typography-title-hero-size)
    var(--sds-typography-title-hero-font-family);
}

.tagline {
  color: var(--Secondary, #1b263b);
  margin-top: 8px;
  font: var(--sds-typography-subtitle-font-weight)
    var(--sds-typography-subtitle-size-base)
    var(--sds-typography-subtitle-font-family);
}

.action-wrapper {
  display: flex;
  margin-top: 32px;
  width: 240px;
  max-width: 100%;
  align-items: center;
  gap: 16px;
  color: #ff6f61;
  font: var(--sds-typography-body-font-weight-regular)
    var(--sds-typography-body-size-medium) / 1
    var(--sds-typography-body-font-family);
}

.primary-button {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background-color: rgba(27, 38, 59, 1);
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(27, 38, 59, 1);
  color: currentColor;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.primary-button:hover,
.primary-button:focus {
  transform: translateY(-2px);
  outline: 2px solid #ff6f61;
  outline-offset: 2px;
}

.primary-button:focus-visible {
  outline: 3px solid #ff6f61;
  outline-offset: 2px;
}

.bold-text {
  font-weight: 700;
}

@media (max-width: 991px) {
  .hero-section {
    padding: 100px 20px;
  }

  .main-title {
    font-size: 40px;
  }
}
</style>