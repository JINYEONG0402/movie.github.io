<template>
  <div class="home">
    <Banner :movie="featuredMovie" />

    <section class="movie-section">
      <h2>인기영화</h2>
      <div class="movie-row">
        <div
          v-for="movie in popularMovies"
          :key="movie.id"
          class="movie-card"
          @click="openMovieDetails(movie)"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <p>{{ movie.title }}</p>
          <span
            class="wishlist-indicator"
            :class="{ active: isInWishlist(movie.id) }"
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
    const selectedMovie = ref(null);

    const loadMovies = async () => {
      try {
        const popularResponse = await fetch(urlService.getURL4PopularMovies());
        popularMovies.value = (await popularResponse.json()).results;

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

    const isInWishlist = (movieId) => {
      return wishListService.isInWishlist(movieId);
    };

    onMounted(() => {
      loadMovies();
    });

    return {
      featuredMovie,
      popularMovies,
      selectedMovie,
      openMovieDetails,
      closeMovieDetails,
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
  background-color: rgb(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-width: 400px; /* 너비를 400px로 축소 */
  width: 90%; /* 모바일에서 화면 크기에 맞게 조정 */
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.movie-poster {
  width: 100%;
  max-height: 250px; /* 포스터 높이 제한 */
  object-fit: contain; /* 비율 유지하며 전체 이미지 표시 */
  border-bottom: 1px solid #ccc;
  background-color: #000; /* 빈 공간 배경을 검정색으로 설정 */
}

.modal-info {
  padding: 15px; /* 패딩 축소 */
  text-align: left;
}

.modal-info h2 {
  margin: 10px 0;
  font-size: 1.3rem; /* 제목 폰트 크기 축소 */
  color: #333;
}

.modal-info p {
  font-size: 0.9rem; /* 본문 폰트 크기 축소 */
  color: #555;
  line-height: 1.4; /* 줄 간격 */
}

.overview {
  margin: 10px 0;
  color: #333;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.2rem; /* 버튼 크기 축소 */
  cursor: pointer;
  background: none;
  border: none;
  color: #333;
}

.close-modal-button {
  margin-top: 10px; /* 간격 축소 */
  padding: 8px 16px; /* 버튼 크기 축소 */
  background-color: #535bf2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem; /* 버튼 폰트 크기 축소 */
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
    font-size: 1.1rem; /* 더 작은 화면에서 제목 크기 조정 */
  }

  .modal-info p {
    font-size: 0.8rem;
  }
}
</style>
