<template>
  <div class="gradient-background">
    <header class="nav-header" role="banner">
      <nav class="nav-container" role="navigation" aria-label="Main navigation">
        <div class="logo-container">
          <div @click="goHome" class="logo-wrapper">
            <img loading="lazy" src="/public/qc_logo.png" class="logo-image" alt="Company Logo" />
          </div>
        </div>

        <ul class="nav-links" role="menubar">
          <li role="none">
            <a href="/chatbot" class="nav-item explore-button" role="menuitem" tabindex="0">Chatbot</a>
          </li>
          <li role="none">
            <a href="/matches" class="nav-item matches-button" role="menuitem" tabindex="0">Matches</a>
          </li>
          <li role="none">
            <a href="/dashboard" class="nav-item dashboard-button" role="menuitem" tabindex="0">Dashboard</a>
          </li>
          <li role="none">
            <a href="/yourprofile" class="nav-item-profile profile-button" role="menuitem" tabindex="0"><div style="position: absolute; margin-left: 11px; font-weight: 700;">P</div></a>
          </li>
        </ul>
      </nav>
    </header>

    <main class="hero-section">
      <div class="content-container">
        <h1 class="main-title">Explore Our Articles</h1>
        
        <div class="articles-grid">
          <article class="article-card">
            <div class="card-image">
              <img src="../assets/a1.png" alt="Article 1" />
            </div>
            <div class="card-content">
              <h2>Everything I Learned About Dating in 2023</h2>
              <p class="author">By Annie Lord</p>
              <a href="https://www.vogue.com/article/everything-i-learned-about-dating-in-2023" target="_blank">
                <button class="primary-button">Read More</button>
              </a>
            </div>
          </article>

          <article class="article-card">
            <div class="card-image">
              <img src="../assets/a2.jpg" alt="Article 2" />
            </div>
            <div class="card-content">
              <h2>Dating Tips: 15 Pieces of Advice</h2>
              <p class="author">By Jose Santi</p>
              <a href="https://theeverygirl.com/new-relationship-advice/" target="_blank">
                <button class="primary-button">Read More</button>
              </a>
            </div>
          </article>

          <article class="article-card">
            <div class="card-image">
              <img src="../assets/a3.jpg" alt="Article 3" />
            </div>
            <div class="card-content">
              <h2>Change Your Mind About Dating</h2>
              <p class="author">Mark Manson</p>
              <a href="https://markmanson.net/change-your-mind" target="_blank">
                <button class="primary-button">Read More</button>
              </a>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

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
  background: #ff6f61;
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
  border-radius: 1000px;
  color: white;
}
.gradient-background {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6f61, white);
}

.hero-section {
  padding: 40px 24px;
  position: relative;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  color: #1b263b;
  font-size: 42px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: -1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  padding: 20px;
}

.article-card {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding:15px;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: rgba(27, 38, 59, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  background: rgba(27, 38, 59, 0.03);
}

.article-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 24px;
}

.card-content h2 {
  color: #1b263b;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.3;
}

.author {
  color: #ff6f61;
  font-size: 0.9rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.primary-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #1b263b, #2d3f59);
  border: none;
  border-radius: 12px;
  color: #ff6f61;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(27, 38, 59, 0.2);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(27, 38, 59, 0.3);
  background: linear-gradient(45deg, #2d3f59, #1b263b);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 32px;
    margin-bottom: 24px;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 12px;
  }

  .card-content {
    padding: 20px;
  }

  .card-content h2 {
    font-size: 1.3rem;
  }
}
</style>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
};
</script>
  