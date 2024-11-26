<template>
  <div class="movie-grid" ref="gridContainer">
    <div :class="['grid-container', currentView]">
      <div
        v-for="(movieGroup, index) in visibleMovieGroups"
        :key="index"
        :class="['movie-row', { full: movieGroup.length === rowSize }]"
      >
        <div
          v-for="movie in movieGroup"
          :key="movie.id"
          class="movie-card"
          @mouseup="toggleWishlist(movie)"
        >
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
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

<script>
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "MovieGrid",
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
    rowSize: {
      type: Number,
      default: 5,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    const currentPage = ref(1);
    const totalPages = computed(() =>
      Math.ceil(props.movies.length / props.pageSize)
    );

    const visibleMovies = computed(() => {
      const startIndex = (currentPage.value - 1) * props.pageSize;
      const endIndex = startIndex + props.pageSize;
      return props.movies.slice(startIndex, endIndex);
    });

    const visibleMovieGroups = computed(() =>
      chunkArray(visibleMovies.value, props.rowSize)
    );

    const getImageUrl = (path) =>
      path ? `https://image.tmdb.org/t/p/w300${path}` : "/default-image.jpg";

    const toggleWishlist = (movie) => {
      console.log("Wishlist toggled for:", movie.title);
    };

    const isInWishlist = (movieId) => {
      return false; // Replace with actual wishlist check logic
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const chunkArray = (array, size) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
      }
      return chunks;
    };

    return {
      currentPage,
      totalPages,
      visibleMovieGroups,
      getImageUrl,
      toggleWishlist,
      isInWishlist,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style scoped>
.movie-grid {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.movie-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.movie-card {
  width: 150px;
  margin: 10px;
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
