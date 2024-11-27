<template>
  <div class="movie-grid" ref="gridContainer">
    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <div v-else :class="['grid-container', currentView]">
      <div
        v-for="(movieGroup, index) in visibleMovieGroups"
        :key="index"
        :class="['movie-row', { full: movieGroup.length === rowSize }]"
      >
        <div
          v-for="movie in movieGroup"
          :key="movie.id"
          class="movie-card"
          @click="toggleWishlist(movie)"
        >
          <img
            :src="getImageUrl(movie.poster_path)"
            :alt="movie.title || 'No Title Available'"
            loading="lazy"
          />
          <div class="movie-title">{{ movie.title }}</div>
          <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">👍</div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        다음 &gt;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "MovieGrid",
  props: {
    fetchUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const movies = ref<any[]>([]); // 빈 배열로 초기화
    const isLoading = ref(true);
    const currentPage = ref(1);
    const rowSize = ref(3);
    const moviesPerPage = ref(20);

    const fetchMovies = async () => {
      try {
        const response = await axios.get(props.fetchUrl);
        movies.value = response.data.results || [];
      } catch (error) {
        console.error("Error fetching movies:", error);
        movies.value = []; // 에러 발생 시 빈 배열로 초기화
      }
    };

    const visibleMovieGroups = computed(() => {
      if (!movies.value || movies.value.length === 0) {
        return [];
      }

      const startIndex = (currentPage.value - 1) * moviesPerPage.value;
      const endIndex = startIndex + moviesPerPage.value;
      const paginatedMovies = movies.value.slice(startIndex, endIndex);

      return paginatedMovies.reduce<any[][]>((resultArray, item, index) => {
        const groupIndex = Math.floor(index / rowSize.value);
        if (!resultArray[groupIndex]) {
          resultArray[groupIndex] = [];
        }
        resultArray[groupIndex].push(item);
        return resultArray;
      }, []);
    });

    const totalPages = computed(() =>
      Math.ceil(movies.value.length / moviesPerPage.value)
    );

    const getImageUrl = (path: string): string => {
      return `https://image.tmdb.org/t/p/w300${path}`;
    };

    const toggleWishlist = (movie: any) => {
      // Wishlist toggle logic
    };

    const isInWishlist = (movieId: number): boolean => {
      // Check wishlist logic
      return false;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    onMounted(async () => {
      await fetchMovies();
      isLoading.value = false;
    });

    return {
      movies,
      isLoading,
      currentPage,
      rowSize,
      moviesPerPage,
      getImageUrl,
      visibleMovieGroups,
      totalPages,
      nextPage,
      prevPage,
      toggleWishlist,
      isInWishlist,
    };
  },
});
</script>

<style scoped>
/* 공통 스타일 */
.movie-grid {
  display: flex;
  flex-direction: column;
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0 10px; /* 양쪽 여백 추가 */
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 카드 간격 조정 */
}

.movie-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px; /* 카드 간 간격 추가 */
}

.movie-card {
  flex: 1 0 45%; /* 카드 크기를 화면에 맞게 조정 (45%) */
  max-width: 150px; /* 최대 너비 제한 */
  margin: 10px; /* 카드 여백 조정 */
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px; /* 버튼에 라운드 처리 */
  background-color: #333;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.pagination button[disabled] {
  background-color: #777;
  cursor: not-allowed;
}

/* 아이폰 13 및 유사한 화면 크기를 위한 미디어 쿼리 */
@media (max-width: 390px) {
  .movie-card {
    flex: 1 0 100%; /* 카드가 한 줄에 하나씩 나타나도록 조정 */
    max-width: 100%; /* 최대 너비를 부모 요소로 제한 */
    margin: 10px 0; /* 상하 간격 추가 */
  }

  .grid-container {
    gap: 5px; /* 간격 축소 */
  }

  .pagination button {
    padding: 8px 12px; /* 버튼 크기 줄임 */
    font-size: 12px; /* 버튼 폰트 크기 줄임 */
  }
}
</style>
