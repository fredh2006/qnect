<template>
  <header class="nav-header" role="banner">
    <nav class="nav-container" role="navigation" aria-label="Main navigation">
      <div class="logo-container">
        <div class="logo-wrapper">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae2d83d4d3e8b13caf1a5b074e86f5725406e34effba8ffd87bfe5f0c8e7e457?placeholderIfAbsent=true&apiKey=3c4b34a732e840c294b3a88a3f1fd290"
            class="logo-image"
            alt="Company Logo"
          />
        </div>
      </div>
      
      <ul class="nav-links" role="menubar">
        <li role="none">
          <a href="#" class="nav-item active" role="menuitem" tabindex="0">Our Mission</a>
        </li>
      </ul>

      <div class="auth-buttons">
        <button class="sign-in-btn" tabindex="0" @click = "handleLog">Sign in</button>
        <button class="register-btn" tabindex="0" @click = "handleRegister">Register</button>
      </div>
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
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 40px;
}

.logo-wrapper {
  display: flex;
  width: 40px;
  align-items: center;
  justify-content: center;
}

.logo-image {
  aspect-ratio: 0.69;
  object-fit: contain;
  width: 24px;
}

.nav-links {
  display: flex;
  min-width: 240px;
  align-items: center;
  gap: 8px;
  color: var(--sds-color-text-default-default);
  justify-content: flex-end;
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  font: var(--sds-typography-body-font-weight-regular)
    var(--sds-typography-body-size-medium) / 1
    var(--sds-typography-body-font-family);
}

.nav-item {
  border-radius: 8px;
  display: flex;
  min-height: 32px;
  gap: 8px;
  padding: 8px;
  text-decoration: none;
  color: inherit;
}

.nav-item.active {
  background-color: rgba(0, 0, 0, 0.05);
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 178px;
  font: var(--sds-typography-body-font-weight-regular)
    var(--sds-typography-body-size-medium) / 1
    var(--sds-typography-body-font-family);
}

.sign-in-btn {
  border-radius: 8px;
  background-color: rgba(255, 111, 97, 1);
  color: var(--Secondary, #1b263b);
  flex: 1;
  padding: 8px;
  border: 1px solid rgba(255, 111, 97, 1);
  cursor: pointer;
}

.register-btn {
  border-radius: 8px;
  background-color: rgba(44, 44, 44, 1);
  color: var(--Accent, #ff6f61);
  flex: 1;
  padding: 8px;
  border: 1px solid rgba(44, 44, 44, 1);
  cursor: pointer;
}

.bold-text {
  font-weight: 700;
}

@media (max-width: 991px) {
  .nav-container {
    padding: 0 20px;
  }
  
  .nav-links {
    max-width: 100%;
  }
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