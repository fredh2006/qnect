<template>
  <main class="dashboard-container" role="main">
    <header class="header-section">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8b11bede3620921516c0a3e35d8b5bab2338ed9ccb42824992b410b5b13f263?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
        class="logo"
        alt="Company logo"
      />
      <nav class="navigation" role="navigation">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d271a49b1a0fcbaaa1f4e434f947cfe88d58f64d3f0b33e6987b3d92769d85d?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
          class="nav-icon"
          alt="Navigation menu icon"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/349a08a1433f78d5889e970228467b382043612f95c8c28b201eb8465f5a3a35?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
          class="nav-text"
          alt="Navigation menu text"
        />
      </nav>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/349a08a1433f78d5889e970228467b382043612f95c8c28b201eb8465f5a3a35?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
        class="profile-icon"
        alt="User profile"
      />
    </header>

    <section class="banner-section">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9d14d3433208500fbd0a5dcc6821349817cfaccffd6174bcd74aecb0a60828e?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
        class="banner-image"
        alt="Banner content"
      />
    </section>

    <section class="content-section">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/edc1aa55-5c15-443f-a0d5-39503fbea8ce?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
        class="sidebar-image"
        alt="Sidebar content"
      />
      <div class="gallery-grid">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c341bb4e7956c90cb362d10f580a0ae5fb720ab16b6cff7fe809c23577fd8022?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
          class="gallery-item"
          alt="Gallery item 1"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c74f172-9b08-45e0-a6c2-6136b897050f?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
          class="gallery-item"
          alt="Gallery item 2"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c47927cb4985565d9afa943c3faf978aa3ac6fdbfe14b40126a27787c0eb958a?apiKey=3c4b34a732e840c294b3a88a3f1fd290&"
          class="gallery-item"
          alt="Gallery item 3"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.dashboard-container {
  background: linear-gradient(to right, rgba(255, 108, 100, 1), rgba(255, 200, 150, 1));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: start;
  padding: 8px 8px 28px 0;
}

.header-section {
  align-self: stretch;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
}

.logo {
  aspect-ratio: 3.68;
  object-fit: contain;
  object-position: center;
  width: 173px;
  align-self: stretch;
  max-width: 100%;
  margin: auto 0;
}

.navigation {
  align-self: stretch;
  display: flex;
  align-items: start;
  gap: 9px;
  margin: auto 0;
  border-right: 2px solid #ccc;
}

.nav-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 18px;
  margin-top: 5px;
}

.nav-text {
  aspect-ratio: 4.2;
  object-fit: contain;
  object-position: center;
  width: 84px;
}

.profile-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 76px;
  align-self: stretch;
}

.banner-image {
  aspect-ratio: 6.9;
  object-fit: contain;
  object-position: center;
  width: 256px;
  max-width: 100%;
  margin: 41px 0 0 201px;
}

.content-section {
  display: flex;
  width: 100%;
  max-width: 1144px;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 62px 0 0 22px;
}

.sidebar-image {
  aspect-ratio: 0.57;
  object-fit: contain;
  object-position: center;
  width: 147px;
  align-self: start;
  margin-top: 54px;
  max-width: 100%;
  /* border-right: 2px solid #ccc; */
}

.gallery-grid {
  display: flex;
  align-items: center;
  gap: 40px 52px;
  flex-wrap: wrap;
}

.gallery-item {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 100px;
  align-self: stretch;
  max-width: 100%;
  margin: auto 0;
}

.gallery-item:nth-child(2) {
  background-color: rgba(217, 217, 217, 1);
  width: 100%;
}

@media (max-width: 991px) {
  .header-section {
    max-width: 100%;
  }

  .banner-image {
    margin: 40px 0 0 10px;
  }

  .content-section {
    max-width: 100%;
    margin-top: 40px;
  }

  .sidebar-image {
    margin-top: 40px;
  }

  .gallery-grid {
    max-width: 100%;
  }

  .gallery-item:nth-child(2) {
    max-width: 100%;
  }
}
</style>