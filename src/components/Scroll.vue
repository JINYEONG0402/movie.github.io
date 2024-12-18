<template>
  <div class="movie-grid" ref="gridContainer">
    <div class="grid-container">
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
    <div ref="loadingTrigger" class="loading-trigger">
      <div v-if="isLoading" class="loading-indicator">Loading...</div>
    </div>
    <button
      v-if="showTopButton"
      class="top-button"
      @click="scrollToTopAndReset"
    >
      Top
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";

export default defineComponent({
  name: "MovieScroll",
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
    rowSize: {
      type: Number,
      default: 5,
    },
  },
  setup(props) {
    const gridContainer = ref<HTMLElement | null>(null);
    const visibleMovies = ref<any[]>([]); // 현재 표시되는 영화
    const isLoading = ref(false);
    const showTopButton = ref(false);
    const wishlist = ref<number[]>([]); // 위시리스트에 있는 영화 ID

    // 영화 그룹을 행 단위로 나누기
    const visibleMovieGroups = computed(() =>
      chunkArray(visibleMovies.value, props.rowSize)
    );

    // 영화 더 가져오기
    const loadMoreMovies = () => {
      if (isLoading.value || visibleMovies.value.length >= props.movies.length)
        return;

      isLoading.value = true;

      setTimeout(() => {
        const nextMovies = props.movies.slice(
          visibleMovies.value.length,
          visibleMovies.value.length + props.rowSize * 2
        );
        visibleMovies.value = visibleMovies.value.concat(nextMovies);
        isLoading.value = false;
      }, 1000);
    };

    // 이미지 URL 가져오기
    const getImageUrl = (path: string | null | undefined): string =>
      path ? `https://image.tmdb.org/t/p/w300${path}` : "/default-image.jpg";

    // 위시리스트 토글
    const toggleWishlist = (movie: any) => {
      if (wishlist.value.includes(movie.id)) {
        wishlist.value = wishlist.value.filter((id) => id !== movie.id);
      } else {
        wishlist.value.push(movie.id);
      }
    };

    // 위시리스트에 있는지 확인
    const isInWishlist = (movieId: number): boolean =>
      wishlist.value.includes(movieId);

    // 맨 위로 스크롤
    const scrollToTopAndReset = () => {
      if (gridContainer.value) {
        gridContainer.value.scrollTo({ top: 0, behavior: "smooth" });
      }
      showTopButton.value = false;
    };

    // 스크롤 이벤트 처리
    const handleScroll = () => {
      if (gridContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = gridContainer.value;
        showTopButton.value = scrollTop > 200;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
          loadMoreMovies();
        }
      }
    };

    // 배열을 행 단위로 나누기
    const chunkArray = (array: any[], size: number) => {
      if (!Array.isArray(array) || size <= 0) return [];
      const chunks = [];
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
      }
      return chunks;
    };

    onMounted(() => {
      visibleMovies.value = props.movies.slice(0, props.rowSize * 2);

      if (gridContainer.value) {
        gridContainer.value.addEventListener("scroll", handleScroll);
      }
    });

    onUnmounted(() => {
      if (gridContainer.value) {
        gridContainer.value.removeEventListener("scroll", handleScroll);
      }
    });

    return {
      gridContainer,
      visibleMovieGroups,
      isLoading,
      showTopButton,
      getImageUrl,
      toggleWishlist,
      isInWishlist,
      scrollToTopAndReset,
    };
  },
});
</script>

<style scoped>
.movie-grid {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 80vh;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.movie-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
}

.movie-row.full {
  justify-content: space-between;
}

.movie-card {
  flex: 1;
  min-width: 150px;
  max-width: 200px;
  cursor: pointer;
  position: relative;
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.movie-title {
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
}

.wishlist-indicator {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 50%;
  font-size: 12px;
}

.loading-trigger {
  text-align: center;
  margin: 20px 0;
}

.loading-indicator {
  font-size: 16px;
  color: gray;
}

.top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: black;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.top-button:hover {
  background-color: gray;
}
</style>
