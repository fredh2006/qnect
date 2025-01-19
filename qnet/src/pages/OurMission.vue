<template>

<header class="nav-header" role="banner">
      <nav class="nav-container" role="navigation" aria-label="Main navigation">
        <div class="logo-container">
          <div @click="goHome" class="logo-wrapper">
            <img loading="lazy" src="/public/qc_logo.png" class="logo-image" alt="Company Logo" />
          </div>
        </div>
      </nav>
    </header>
<div class="hero-container">
  <div class="vision-text">
    Our Vision: Providing a dating platform that offers users the ability to genuinely share their perspectives and personality by implementing a picture-free environment.
  </div>
</div>

</template>

<script>
export default {
    name: 'OurMission',
    methods: {
        goHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style>
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

.hero-container {
  background: linear-gradient(135deg, #ff6f61, white);
  min-height: calc(100vh - 64px);
  padding: 40px 24px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.vision-text {
  max-width: 800px;
  font-size: 3rem;
  font-weight: 800;
  color: #1b263b;
  line-height: 1.4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-out;
  background: linear-gradient(45deg, #1b263b, #ff6f61);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>