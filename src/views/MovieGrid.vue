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
.movie-grid {
  display: flex;
  flex-direction: column;
  margin: 0 0;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.movie-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.movie-card {
  flex: 1;
  width: 150px;
  margin: 100px;
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
  padding: 5px 10px;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
}

.pagination button[disabled] {
  background-color: #777;
  cursor: not-allowed;
}
</style>
