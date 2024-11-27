<template>
  <div class="container-search">
    <!-- 필터 섹션 -->
    <div class="container-search-bar">
      <select v-model="selectedGenre" @change="updateMovies">
        <option v-for="(value, key) in genreCode" :key="value" :value="value">
          {{ key }}
        </option>
      </select>
      <select v-model="selectedSort" @change="updateMovies">
        <option v-for="(value, key) in sortingCode" :key="value" :value="value">
          {{ key }}
        </option>
      </select>
      <select v-model="selectedAge" @change="updateMovies">
        <option v-for="(value, key) in ageCode" :key="value" :value="value">
          {{ key }}
        </option>
      </select>
      <button @click="resetFilters" class="reset-button">초기화</button>
    </div>
    <!-- 콘텐츠 섹션 -->
    <div class="content-search">
      <h2>{{ selectedGenreName }} 영화</h2>
      <div class="movie-list">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="movie-card"
          @click="toggleWishlist(movie)"
        >
          <img
            v-if="movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <p>{{ movie.title }}</p>
          <!-- Wishlist 상태 표시 -->
          <span
            class="wishlist-indicator"
            :class="{ active: isInWishlist(movie.id) }"
          >
            ♥
          </span>
        </div>
        <!-- 로딩 스피너 -->
        <div v-if="isLoading" class="loading-spinner">로딩 중...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { wishListService } from "@/utils/WishList";

export default {
  name: "Search",
  setup() {
    const apiKey = ref(localStorage.getItem("TMDb-Key") || "");
    const selectedGenre = ref(0); // 기본 장르
    const selectedSort = ref("all"); // 기본 정렬
    const selectedAge = ref(-1); // 기본 평점
    const movies = ref([]); // 영화 리스트
    const currentPage = ref(1); // 현재 페이지
    const totalPages = ref(1); // 총 페이지 수
    const isLoading = ref(false); // 로딩 상태
    const genreCode = {
      "장르 (전체)": 0,
      "액 션": 28,
      "판타지, 모험": 12,
      "코 미디": 35,
      "공 포": 80,
      "가 족": 10751,
    };
    const sortingCode = {
      "언 어": "all",
      En: "en",
      Ko: "ko",
    };
    const ageCode = {
      "평 점": -1,
      "9~10": 9,
      "8~9": 8,
      "7~8": 7,
      "6~7": 6,
      "5~6": 5,
      "4~5": 4,
      "4점 이하": -2,
    };

    const selectedGenreName = computed(() => {
      return (
        Object.keys(genreCode).find(
          (key) => genreCode[key] === parseInt(selectedGenre.value)
        ) || "전체"
      );
    });

    const fetchMovies = async (page = 1) => {
      if (isLoading.value || page > totalPages.value) return;

      isLoading.value = true;

      const genreQuery =
        selectedGenre.value !== 0 ? `&with_genres=${selectedGenre.value}` : "";
      const sortQuery =
        selectedSort.value !== "all"
          ? `&with_original_language=${selectedSort.value}`
          : "";
      const ageQuery =
        selectedAge.value >= 0 ? `&vote_average.gte=${selectedAge.value}` : "";

      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey.value}&language=ko-KR&page=${page}${genreQuery}${sortQuery}${ageQuery}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        movies.value = [...movies.value, ...data.results]; // 데이터를 병합
        totalPages.value = data.total_pages; // 총 페이지 업데이트
        currentPage.value = page; // 현재 페이지 업데이트
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const loadMoreMovies = () => {
      fetchMovies(currentPage.value + 1); // 다음 페이지 데이터를 가져옴
    };

    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll >= scrollableHeight - 200) {
        loadMoreMovies(); // 스크롤 위치가 끝에 가까워지면 추가 데이터 로드
      }
    };

    const resetFilters = () => {
      selectedGenre.value = 0;
      selectedSort.value = "all";
      selectedAge.value = -1;
      movies.value = [];
      currentPage.value = 1;
      fetchMovies(1);
    };

    const updateMovies = () => {
      movies.value = [];
      currentPage.value = 1;
      fetchMovies(1);
    };

    const toggleWishlist = (movie) => {
      wishListService.toggleWishlist(movie);
    };

    const isInWishlist = (movieId) => {
      return wishListService.isInWishlist(movieId);
    };

    onMounted(() => {
      fetchMovies(); // 첫 데이터 로드
      window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 추가
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll); // 스크롤 이벤트 제거
    });

    return {
      selectedGenre,
      selectedSort,
      selectedAge,
      selectedGenreName,
      movies,
      genreCode,
      sortingCode,
      ageCode,
      resetFilters,
      updateMovies,
      toggleWishlist,
      isInWishlist,
      isLoading,
    };
  },
};
</script>

<style scoped>
.container-search {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container-search-bar {
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.container-search-bar select {
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.reset-button {
  padding: 10px 20px;
  background-color: #ff35e8;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #ff35e8;
}

.content-search {
  width: 100%;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  overflow-y: visible;
}

.movie-card {
  width: 150px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

h2 {
  margin-bottom: 20px;
  color: white;
  font-size: 1.5rem;
}

.loading-spinner {
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  margin-top: 20px;
}

.wishlist-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: #ffffff;
  background-color: rgb(0, 0, 0, 0.5);
  box-shadow: 0 0 5px rgb(115, 2, 102);
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
}

.wishlist-indicator.active {
  color: rgb(255, 53, 232);
  background-color: rgb(0, 0, 0);
  box-shadow: 0 0 5px rgb(255, 53, 232);
  transform: scale(1.1);
}
</style>
