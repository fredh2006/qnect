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
            <a href="/dashboard" class="nav-item explore-button" role="menuitem" tabindex="0">Dashboard</a>
          </li>
          <li role="none">
            <a href="/matches" class="nav-item matches-button" role="menuitem" tabindex="0">Matches</a>
          </li>
          <li role="none">
            <a href="/chatbot" class="nav-item chat-button" role="menuitem" tabindex="0">ChatBot</a>
          </li>
          <li role="none">
            <a href="/yourprofile" class="nav-item-profile profile-button" role="menuitem" tabindex="0"><div style = "position: absolute; margin-left: 11px; font-weight: 700;">P</div></a>
          </li>
        </ul>
      </nav>
    </header>
    <div class="explore-page">

      <main>
        <h1>Explore Our Articles</h1>
        <br>
        <br>
        <div class="articles">
          <article class="card">
            <img src="../assets/a1.png" alt="Article 1" />
            <h2>Everything I Learned About Dating in 2023</h2>
            <p>By Annie Lord</p>
            <a  href="https://www.vogue.com/article/everything-i-learned-about-dating-in-2023"><button>Read More</button></a>
          </article>
          <article class="card">
            <img src="../assets/a2.jpg" alt="Article 2" />
            <h2>Dating Tips: 15 Pieces of Advice to Help You Build a Healthy New Relationship</h2>
            <p>By Jose Santi</p>
            <a target=”_blank” href="https://theeverygirl.com/new-relationship-advice/"><button>Read More</button></a>
          </article>
          <article class="card">
            <img src="../assets/a3.png" alt="Article 3" />
            <h2>NBA Superstar on maintaing healthy relationships and Dating Advice</h2>
            <a target=”_blank” href="https://www.yahoo.com/entertainment/shai-gilgeous-alexander-girlfriend-hailey-050619503.html"><button @click="viewArticle(3)">Read More</button></a>
          </article>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$router.push('/');
      },
   
    }
  };
  </script>
  
  <style scoped>

.nav-header {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(255, 111, 97, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
}

main h1{
    font-size: 3rem; /* Makes the text larger */
  font-weight: bold; /* Makes the text bold */
  text-align: left; /* Aligns the text to the left */
  width: 100%; /* Ensure it takes full width of its container */
  margin: 0; /* Remove any default margin */
  padding-left: 20px; /* Adds space from the left */
  color: #1b263b; /* Optional: Customize the text color */
  font-size: 26px;
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
    background-color: rgba(27, 38, 59, 1);
    border-color: rgba(27, 38, 59, 1);
    color: #ff6f61;
}

.explore-button {
  background-color: rgb(222, 205, 205);
  border-color: rgb(222, 205, 205);
}

.profile-button {
  background-color: rgba(27, 38, 59, 1);
  border-color: rgb(27, 38, 59);
  border-radius: 100px;
  color: white;
}

  .explore-page {
    font-family: Arial, sans-serif;
    color: #1b263b;
    background: linear-gradient(135deg, #ff6f61, white);
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid rgba(255, 111, 97, 0.1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
  }
  
  .nav {
    display: flex;
    align-items: center;
  }
  
  .logo img {
    width: 64px;
    cursor: pointer;
  }
  
  .nav-menu {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }
  
  .nav-menu a {
    text-decoration: none;
    color: #1b263b;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .nav-menu a.active {
    background: #ff6f61;
    color: white;
  }
  
  .nav-menu a:hover {
    background: rgba(255, 111, 97, 0.1);
  }
  
  main {
    padding: 2rem;
    text-align: center;
  }
  
  .articles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  
  .card {
    background: rgba(255, 255, 255, 0.97);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  }
  
  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card h2 {
    font-size: 1.5rem;
    color: #1b263b;
    margin: 1rem;
  }
  
  .card p {
    font-size: 1rem;
    color: #555;
    margin: 0 1rem 1rem;
  }
  
  .card button {
    margin: 1rem;
    padding: 0.5rem 1rem;
    background-color: #ff6f61;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .card button:hover {
    background-color: rgba(255, 111, 97, 0.9);
  }
  </style>
  