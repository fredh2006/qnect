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
                        <a href="/explore" class="nav-item explore-button" role="menuitem" tabindex="0">Explore</a>
                    </li>
                    <li role="none">
                        <a href="/matches" class="nav-item matches-button" role="menuitem" tabindex="0">Matches</a>
                    </li>
                    <li role="none">
                        <a href="/dashboard" class="nav-item dashboard-button" role="menuitem"
                            tabindex="0">Dashboard</a>
                    </li>
                    <li role="none">
                        <a href="/chatbot" class="nav-item chat-button" role="menuitem" tabindex="0">ChatBot</a>
                    </li>
                </ul>
            </nav>
        </header>

        <div class="chat-page">

            <main class="hero-section">
                <div class="dashboard-container" v-if="userProfile">
                    <h1 class="main-title">{{ userProfile.name }}</h1>

                    <div class="profile-card" v-if="userProfile">
                        <div class="card-content">
                            <div class="info-grid">
                                <div class="info-item">
                                    <strong>Age:</strong> {{ userProfile.age }}
                                </div>
                                <div class="info-item">
                                    <strong>Gender:</strong> {{ userProfile.gender }}
                                </div>
                                <div class="info-item">
                                    <strong>Location:</strong> {{ userProfile.location }}
                                </div>
                            </div>

                            <div class="questions-box">
                                <h3>Your Questions & Answers</h3>
                                <div v-for="(answer, question) in userProfile.questions" :key="question"
                                    class="question-answer">
                                    <p><strong>{{ question }}:</strong></p>
                                    <p>{{ answer }}</p>
                                </div>
                            </div>

                            <div class="stats-grid">
                                <div class="stat-item">
                                    <h4>You've matched</h4>
                                    <p>{{ userProfile.matches.length }}</p>
                                    <h4>times</h4>
                                </div>
                                <div class="stat-item">
                                    <h4>You've given</h4>
                                    <p>{{ userProfile.likes.length }}</p>
                                    <h4>likes</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userProfile: null,
            userId: sessionStorage.getItem('userId'),
        };
    },
    mounted() {
        this.fetchUserProfile();
    },
    methods: {
        goHome(){
        this.$router.push('/')
    },
        async fetchUserProfile() {
            console.log('hello')
            try {
                const response = await axios.get(`http://localhost:3000/api/person/${this.userId}`);
                if (response.data.success) {
                    this.userProfile = response.data.person;
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        },
    },
};
</script>

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

.nav-item:hover {
    color: #ff6f61;
    background: rgba(255, 111, 97, 0.1);
}

.matches-button{
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
    border-radius: 100px;
}

.gradient-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100vh;
    min-width: 100vw;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #ff6f61 0%, #ffffff 100%);
    background-attachment: fixed;
    background-size: cover;
    z-index: -1;
}

.hero-section {
    background: linear-gradient(135deg, #ff6f61, white);
    min-height: calc(100vh - 64px);
    padding: 20px 24px;
    overflow-y: auto;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
}

.dashboard-container {
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 40px;
}

.main-title {
    color: rgba(27, 38, 59, 1);
    letter-spacing: -2.16px;
    font-size: 48px;
    font-weight: 700;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-card {
    background: rgba(255, 255, 255, 0.97);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.card-title {
    color: #ff6f61;
    font-size: 2.4rem;
    margin: 0;
    text-align: center;
    font-weight: 700;
    letter-spacing: -1px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 28px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.info-item {
    font-size: 1.2rem;
    text-align: center;
    padding: 12px;
    transition: transform 0.2s ease;
}

.info-item:hover {
    transform: translateY(-2px);
}

.info-item strong {
    display: block;
    color: #1b263b;
    margin-bottom: 8px;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.questions-box {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.questions-box h3 {
    color: #1b263b;
    margin: 0 0 24px 0;
    font-size: 1.4rem;
    text-align: center;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.question-answer {
    margin-bottom: 20px;
    padding: 16px;
    border-bottom: 1px solid rgba(27, 38, 59, 0.08);
    transition: background-color 0.2s ease;
}

.question-answer:hover {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
}

.question-answer:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.question-answer strong {
    color: #1b263b;
    font-weight: 600;
    font-size: 1.1rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    margin: 12px auto;
    max-width: 500px;
    padding: 0 16px;
}
.stat-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.stat-item {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 120px; /* Ensure consistent height */
}

.stat-item h4 {
  color: #1b263b;
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  width: 100%; /* Ensure text wraps properly */
}

.stat-item p {
  color: #ff6f61;
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .main-title {
        font-size: 36px;
        margin: 8px 0 20px;
    }
    
    .profile-card {
        padding: 28px;
        border-radius: 16px;
    }
    
    .info-grid {
        grid-template-columns: 1fr;
        padding: 20px;
    }
    
    .card-title {
        font-size: 2rem;
    }
    
    .stats-grid {
        gap: 20px;
        padding: 0 8px;
    }
    
    .stat-item p {
        font-size: 2rem;
    }
    
    .questions-box {
        padding: 24px;
    }
    
    .nav-container {
        padding: 0 16px;
    }
    
    .search-container {
        max-width: 200px;
        margin: 0 12px;
    }
    
    .nav-item {
        padding: 8px 12px;
        font-size: 0.9rem;
    }
}

/* Custom scrollbar */
.hero-section::-webkit-scrollbar {
    width: 8px;
}

.hero-section::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
}

.hero-section::-webkit-scrollbar-thumb {
    background: rgba(255, 111, 97, 0.5);
    border-radius: 4px;
}

.hero-section::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 111, 97, 0.7);
}
</style>