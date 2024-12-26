<template>
  <div
    v-if="movie"
    class="banner"
    :style="{ backgroundImage: `url(${backdropUrl})` }"
  >
    <div class="banner-content">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
      <button class="play-btn title-btn">재생</button>
      <button @click="toggleDetails" class="info-btn title-btn">
        상세 정보
      </button>
    </div>

    <!-- 상세 정보 모달 -->
    <div v-if="showDetails" class="movie-details">
      <div class="details-content">
        <button class="close-btn" @click="toggleDetails">×</button>
        <div class="details-grid">
          <div class="poster">
            <img
              :src="posterUrl"
              :alt="movie.title"
              @error="handleImageError"
            />
          </div>
          <div class="info">
            <h2>{{ movie.title }}</h2>
            <div class="details-info">
              <p><strong>개봉일:</strong> {{ movie.release_date }}</p>
              <p><strong>평점:</strong> {{ movie.vote_average }}/10</p>
              <p>
                <strong>장르:</strong>
                {{ movie.genres?.map((g) => g.name).join(", ") }}
              </p>
              <p class="overview">
                <strong>줄거리:</strong> {{ movie.overview }}
              </p>
            </div>
          </div>
        </div>
        <div class="trailer-section" v-if="trailerUrl">
          <h3>예고편</h3>
          <iframe
            :src="trailerUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading banner...</p>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    movie: {
      type: Object,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      showDetails: false,
      trailerUrl: null,
    };
  },
  computed: {
    backdropUrl() {
      return this.movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
        : "";
    },
    posterUrl() {
      return this.movie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : "";
    },
  },
  watch: {
    showDetails(newVal) {
      if (newVal && this.movie) {
        this.fetchTrailer();
      }
    },
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    handleImageError(e) {
      e.target.src = "/placeholder-image.jpg"; // 기본 이미지 경로로 대체
    },
    async fetchTrailer() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${this.movie.id}/videos?api_key=fb2191b2c2e7923b7b79f8e3fa925043`
        );
        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    },
  },
};
</script>

<style scoped>
.banner {
  height: 70vh;
  max-width: 100svw;
  background-size: cover;
  background-position: center;
  color: #ffffff;
  display: flex;
  align-items: flex-end;
  margin-top: 5px;
}

.banner-content {
  padding: 50px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.banner h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.banner p {
  font-size: 1rem;
  max-width: 500px;
  margin-bottom: 1rem;
  text-align: left;
}

.play-btn,
.info-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.play-btn {
  background-color: white;
  color: black;
}

.info-btn {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}

.title-btn {
  margin-top: 5px;
  width: 150px;
}

.movie-details {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.details-content {
  background-color: #141414;
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  color: white;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.details-info {
  margin-top: 1rem;
}

.details-info p {
  margin: 0.5rem 0;
}

.details-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.poster img {
  width: 100%;
  border-radius: 8px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.overview {
  line-height: 1.6;
}

.trailer-section {
  margin-top: 2rem;
}

.trailer-section h3 {
  margin-bottom: 1rem;
}

iframe {
  width: 100%;
  height: 400px;
  border-radius: 8px;
}

@media screen and (max-width: 390px) and (max-height: 844px) {
  .banner h1 {
    font-size: 2rem;
    margin-bottom: 0.4rem;
  }

  .banner-content {
    padding: 10px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      transparent 100%
    );
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .banner p {
    font-size: 0.85rem;
    max-width: 350px;
    margin-bottom: 0.8rem;
    text-align: left;
  }

  .title-btn {
    margin-top: 4px;
    width: 90px;
    font-size: 0.7rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .poster img {
    max-width: 200px;
    margin: 0 auto;
    display: block;
  }

  iframe {
    height: 200px;
  }

  .details-info {
    font-size: 0.9rem;
  }

  .details-content {
    width: 95%;
    padding: 1rem;
    margin: 1rem;
  }
}
</style>
