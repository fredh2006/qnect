<template>
  <main class="dashboard-container" role="main">
    <header class="header-nav" role="banner">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8b11bede3620921516c0a3e35d8b5bab2338ed9ccb42824992b410b5b13f263?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
        class="logo"
        alt="Company logo"
      />
      <div class="search-wrapper">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2ddc37808ff9ec54d2842258b667489298a7e8ad45a8bbdf05ebe418eff509d?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
          class="search-icon"
          alt=""
        />
        <span class="search-text">search</span>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/043020189a272e6371a31ecc1984b07f7bf186be1b974455242225535d63354b?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
        class="profile-avatar"
        alt="User profile"
      />
    </header>

    <h1 class="page-title">Dashboard</h1>

    <section class="content-wrapper">
      <nav class="navigation" role="navigation">
        <ul class="nav-list">
          <li>Explore</li>
          <li>Matches</li>
          <li>ChatBot</li>
        </ul>
      </nav>

      <article class="profile-card">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe89f428d0eaa2d01668327191455af5f32e659d53a6d4976ed5f8d81a1ad418?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
          class="profile-image"
          alt="Profile photo"
        />
        <div class="profile-details">
          <h2 class="profile-name">**Name**</h2>
          <p class="profile-age">**Age**</p>
          <p class="profile-location">**location**</p>
          
          <div class="questions-section">
            <h3 class="question">Question 1:</h3>
            <h3 class="question">Question 2:</h3>
            <h3 class="question">Question 3:</h3>
          </div>

          <div class="action-buttons">
            <button class="action-btn" aria-label="Like profile">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f804a074393477b38a3b92d07c0add50c56078088316b7abf3b4c1765adbb26?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
                alt=""
              />
            </button>
            <button class="action-btn" aria-label="Super like profile">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6eb005298e4e6df62ff3c428f0c121deab30b21b417ab7ceadeaae701f64035?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
                alt=""
              />
            </button>
            <button class="action-btn" aria-label="Pass profile">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fef519408a457b8ad442a1c5c99453ff58f3724a461c73bbee37e611a757426?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
                alt=""
              />
            </button>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e2c8487e0e06b661827b7d752d928b8e5a5ff3428cd8b61acffb422744390ec?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
          class="profile-badge"
          alt=""
        />
      </article>
    </section>
  </main>
</template>

<style scoped>
.dashboard-container {
  background: rgba(255, 108, 100, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: start;
  padding: 8px 8px 28px 0;
}

.header-nav {
  align-self: stretch;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
  color: #fff;
  justify-content: space-between;
  font: 400 40px Katibeh, sans-serif;
}

.logo {
  aspect-ratio: 3.68;
  object-fit: contain;
  width: 173px;
  align-self: stretch;
}

.search-wrapper {
  display: flex;
  align-items: start;
  gap: 5px;
}

.search-icon {
  aspect-ratio: 1;
  object-fit: contain;
  width: 24px;
  margin-top: 6px;
}

.profile-avatar {
  aspect-ratio: 1;
  object-fit: contain;
  width: 76px;
  border-radius: 50%;
}

.page-title {
  color: #fff;
  margin: 33px 0 0 199px;
  font: 400 74px Katibeh, sans-serif;
}

.content-wrapper {
  display: flex;
  width: 100%;
  max-width: 1143px;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 70px 0 0 33px;
}

.navigation {
  color: #fff;
  text-align: center;
  margin-top: 60px;
  font: 400 40px/48px Katibeh, sans-serif;
}

.nav-list {
  list-style: none;
  padding: 0;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 40px 44px;
  flex-wrap: wrap;
}

.profile-image {
  aspect-ratio: 1;
  object-fit: contain;
  width: 120px;
  align-self: stretch;
}

.profile-details {
  border-radius: 50px;
  background: rgba(217, 217, 217, 1);
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 45px 54px;
}

.profile-name {
  color: #000;
  text-align: center;
  font: 400 36px 'Lily Script One', sans-serif;
  margin: 0;
}

.profile-age {
  color: #000;
  text-align: center;
  z-index: 10;
  margin-top: -8px;
  font: 400 32px Katibeh, sans-serif;
}

.profile-location {
  color: #000;
  text-align: center;
  font: 400 32px Katibeh, sans-serif;
}

.question {
  color: #000;
  align-self: start;
  margin-top: 74px;
  font: 400 26px 'Lily Script One', sans-serif;
}

.action-buttons {
  display: flex;
  margin-top: 84px;
  width: 405px;
  max-width: 100%;
  align-items: start;
  gap: 20px;
  justify-content: space-between;
}

.action-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.action-btn img {
  aspect-ratio: 1;
  object-fit: contain;
  width: 72px;
}

.profile-badge {
  aspect-ratio: 1;
  object-fit: contain;
  width: 120px;
  align-self: stretch;
}

@media (max-width: 991px) {
  .header-nav {
    max-width: 100%;
    white-space: initial;
  }

  .page-title {
    margin-left: 10px;
    font-size: 40px;
  }

  .content-wrapper {
    max-width: 100%;
    margin-top: 40px;
  }

  .navigation {
    margin-top: 40px;
  }

  .profile-card {
    max-width: 100%;
  }

  .profile-details {
    max-width: 100%;
    padding: 0 20px;
  }

  .question {
    margin-top: 40px;
  }

  .action-buttons {
    margin-top: 40px;
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
  border: 0;
}
</style>