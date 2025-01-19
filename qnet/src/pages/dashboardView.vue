<template>
  <link href="https://fonts.googleapis.com/css2?family=Lily+Script+One&family=Katibeh&display=swap" rel="stylesheet">
  <div class="dashboard-layout">
    <aside class="sidebar">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8b11bede3620921516c0a3e35d8b5bab2338ed9ccb42824992b410b5b13f263?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
        class="logo"
        alt="Company logo"
      />
      <nav class="nav-menu">
        <a href="#" class="nav-item">Explore</a>
        <a href="#" class="nav-item">Matches</a>
        <a href="#" class="nav-item">ChatBot</a>
      </nav>
    </aside>
    
    <main class="main-content">
      <header class="search-bar">
        <input type="search" placeholder="search" class="search-input">
      </header>
      
      <h1 class="dashboard-title">Welcome</h1>
      
      <div class="profile-card">
        <div class="profile-info">
          <p class="profile-name">**Name**</p>
          <p class="profile-age">**Age**</p>
          <p class="profile-location">**location**</p>
        </div>
        
        <div class="questions">
          <p class="question">Question 1:</p>
          <p class="question">Question 2:</p>
          <p class="question">Question 3:</p>
        </div>
        
        <div class="action-buttons">
          <button class="reject-btn" aria-label="Reject">✕</button>
          <button class="bookmark-btn" aria-label="Bookmark">☆</button>
          <button class="accept-btn" aria-label="Accept">✓</button>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  min-height: 100vh;
  background-color: #ff6f61;
}
.sidebar {
  background-color: #ff6f61;
  padding: 2rem;
  border-right: 2px solid rgba(255, 255, 255, 0.2);
}
.logo {
  font-family: 'Katibeh', cursive;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 3rem;
}
.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin-top: 15vh;
  width: 100%;
}
.nav-item {
  font-family: 'Katibeh', cursive;
  color: white;
  text-decoration: none;
  font-size: 2.2rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 90%;
  text-align: center;
}
.main-content {
  padding: 2rem;
}
.search-bar {
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
}
.search-bar::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: -200px;
  right: -2rem;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.3);
}
.search-input {
  font-family: 'Katibeh', cursive;
  width: 100%;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1.6rem;
}
.search-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.dashboard-title {
  font-family: 'Katibeh', cursive;
  color: white;
  font-size: 3rem;
  margin-bottom: 2rem;
}
.profile-card {
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
.profile-info {
  text-align: center;
  margin-bottom: 1.5rem;
}
.profile-name {
  font-family: 'Lily Script One', cursive;
  font-size: 1.8rem;
  margin-bottom: 0.05rem;
}
.profile-age {
  font-family: 'Katibeh', cursive;
  font-size: 1.4rem;
  margin-bottom: 0.05rem;
}
.profile-location {
  font-family: 'Katibeh', cursive;
  font-size: 1.4rem;
  margin-bottom: 0;
}
.questions {
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
}
.question {
  font-family: 'Lily Script One', cursive;
  font-size: 1.5rem;
  margin: 0;
}
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
.action-buttons button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}
.reject-btn {
  background-color: #ff4444;
  color: white;
}
.bookmark-btn {
  background-color: white;
  border: 2px solid #666!important;
}
.accept-btn {
  background-color: #00C851;
  color: white;
}
</style>
<script>
export default {
  name: 'DashboardView'
}
</script>