<template>
  <main class="hero-section" role="main">
    <section class="content-wrapper">
      <h1 class="brand-title">Qnect</h1>
      <p class="brand-tagline">No Photos, Just Chemistry.</p>
    </section>
    <div class="action-wrapper">
      <button 
        class="primary-button"
        tabindex="0"
        role="button"
        aria-label="Start Your Journey"
      >
        <span class="button-text">Start Your Journey</span>
      </button>
    </div>
  </main>
</template>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 160px 24px;
}

@media (max-width: 991px) {
  .hero-section {
    padding: 100px 20px;
  }
}

.content-wrapper {
  display: flex;
  width: 412px;
  max-width: 100%;
  flex-direction: column;
  text-align: center;
  line-height: 1.2;
  justify-content: start;
}

.brand-title {
  color: var(--Accent, #ff6f61);
  letter-spacing: -2.16px;
  font: var(--sds-typography-title-hero-font-weight)
    var(--sds-typography-title-hero-size)
    var(--sds-typography-title-hero-font-family);
}

@media (max-width: 991px) {
  .brand-title {
    font-size: 40px;
  }
}

.brand-tagline {
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
  justify-content: start;
  font: var(--sds-typography-body-font-weight-regular)
    var(--sds-typography-body-size-medium) / 1
    var(--sds-typography-body-font-family);
}

.primary-button {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background-color: rgba(27, 38, 59, 1);
  width: 100%;
  gap: 8px;
  overflow: hidden;
  flex: 1;
  margin: auto 0;
  padding: 12px;
  border: 1px solid rgba(27, 38, 59, 1);
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

.button-text {
  font-weight: 700;
  color: #ff6f61;
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
</style>
