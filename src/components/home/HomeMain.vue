<template>
  <div class="home">
    <Banner :movie="featuredMovie" />

    <section class="movie-section">
      <h2>인기영화</h2>
      <div class="movie-row">
        <div v-for="movie in popularMovies" :key="movie.id" class="movie-card">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            @click="openMovieDetails(movie)"
          />
          <p>{{ movie.title }}</p>
          <span
            class="wishlist-indicator"
            :class="{ active: isInWishlist(movie.id) }"
            @click.stop="handleWishlistClick(movie)"
          >
            ♥
          </span>
        </div>
      </div>
    </section>

    <section class="movie-section">
      <h2>신작</h2>
      <div class="movie-row">
        <div v-for="movie in newReleases" :key="movie.id" class="movie-card">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            @click="openMovieDetails(movie)"
          />
          <p>{{ movie.title }}</p>
          <span
            class="wishlist-indicator"
            :class="{ active: isInWishlist(movie.id) }"
            @click.stop="handleWishlistClick(movie)"
          >
            ♥
          </span>
        </div>
      </div>
    </section>

    <section class="movie-section">
      <h2>액션영화</h2>
      <div class="movie-row">
        <div v-for="movie in actionMovies" :key="movie.id" class="movie-card">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            @click="openMovieDetails(movie)"
          />
          <p>{{ movie.title }}</p>
          <span
            class="wishlist-indicator"
            :class="{ active: isInWishlist(movie.id) }"
            @click.stop="handleWishlistClick(movie)"
          >
            ♥
          </span>
        </div>
      </div>
    </section>

    <!-- 상세 정보 모달 -->
    <div v-if="selectedMovie" class="movie-details-modal">
      <div class="modal-content">
        <span class="close-button" @click="closeMovieDetails">×</span>
        <img
          v-if="selectedMovie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`"
          :alt="selectedMovie.title"
          class="movie-poster"
        />
        <div class="modal-info">
          <h2>{{ selectedMovie.title }}</h2>
          <p><strong>평점:</strong> {{ selectedMovie.vote_average }}/10</p>
          <p><strong>줄거리:</strong></p>
          <p class="overview">
            {{ selectedMovie.overview || "정보가 없습니다." }}
          </p>
          <button class="close-modal-button" @click="closeMovieDetails">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Banner from "@/components/home/Banner.vue";
import { urlService } from "@/utils/URLService";
import { wishListService } from "@/utils/WishList";

export default {
  name: "HomeMain",
  components: { Banner },
  setup() {
    const featuredMovie = ref({});
    const popularMovies = ref([]);
    const newReleases = ref([]);
    const actionMovies = ref([]);
    const selectedMovie = ref(null);

    const loadMovies = async () => {
      try {
        const popularResponse = await fetch(urlService.getURL4PopularMovies());
        popularMovies.value = (await popularResponse.json()).results;

        const newReleasesResponse = await fetch(
          urlService.getURL4ReleaseMovies()
        );
        newReleases.value = (await newReleasesResponse.json()).results;

        const actionResponse = await fetch(urlService.getURL4GenreMovies("28"));
        actionMovies.value = (await actionResponse.json()).results;

        if (popularMovies.value.length >= 1) {
          featuredMovie.value = popularMovies.value[0]; // 첫 번째 영화를 배너로 설정
        }
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    };

    const openMovieDetails = (movie) => {
      selectedMovie.value = movie;
    };

    const closeMovieDetails = () => {
      selectedMovie.value = null;
    };

    const handleWishlistClick = (movie) => {
      wishListService.toggleWishlist(movie);
    };

    const isInWishlist = (movieId) => {
      return wishListService.isInWishlist(movieId);
    };

    onMounted(() => {
      loadMovies();
    });

    return {
      featuredMovie,
      popularMovies,
      newReleases,
      actionMovies,
      selectedMovie,
      openMovieDetails,
      closeMovieDetails,
      handleWishlistClick,
      isInWishlist,
    };
  },
};
</script>

<style scoped>
.home {
  display: block;
}

.movie-section {
  margin-bottom: 30px;
}

.movie-row {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px;
}

.movie-card {
  flex: 0 0 auto;
  width: 150px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.wishlist-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: color 0.3s, transform 0.3s;
}
.wishlist-indicator.active {
  color: rgb(255, 53, 232); /* 하트 색상 변경 */
  transform: scale(1.1); /* 크기 확대 */
}

.wishlist-indicator:hover {
  transform: scale(1.2);
}
/* 모달 스타일 */
.movie-details-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 10px; /* 여백 축소 */
}

.modal-content {
  background-color: #fff;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.movie-poster {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-bottom: 1px solid #ccc;
  background-color: #000;
}

.modal-info {
  padding: 15px;
  text-align: left;
}

.modal-info h2 {
  margin: 10px 0;
  font-size: 1.3rem;
  color: #333;
}

.modal-info p {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
}

.overview {
  margin: 10px 0;
  color: #333;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  background: none;
  border: none;
  color: #333;
}

.close-modal-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #535bf2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

.close-modal-button:hover {
  background-color: #4044c9;
}

/* 모바일 반응형 */
@media screen and (max-width: 767px) {
  .modal-content {
    max-width: 90%;
  }

  .modal-info h2 {
    font-size: 1.1rem;
  }

  .modal-info p {
    font-size: 0.8rem;
  }
}
</style>
