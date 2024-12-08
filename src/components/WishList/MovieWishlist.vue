<template>
  <div class="movie-grid" ref="gridContainer">
    <div :class="['grid-container', currentView]">
      <div
        v-for="(movieGroup, i) in visibleWishlistMovies"
        :key="i"
        :class="['movie-row', { full: movieGroup.length === rowSize }]"
      >
        <div
          v-for="movie in movieGroup"
          :key="movie.id"
          class="movie-card"
          @click="toggleWishlist(movie)"
        >
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-title">{{ movie.title }}</div>
          <div
            class="wishlist-indicator"
            :class="{ active: isMovieInWishlist(movie.id) }"
          >
            ♥
          </div>
        </div>
      </div>
    </div>
    <div v-if="wishlistMovies.length === 0" class="empty-wishlist">
      위시리스트가 비어 있습니다.
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { wishListService } from "@/utils/WishList";

export default {
  name: "MovieWishlist",
  setup() {
    const gridContainer = ref(null);
    const wishlistMovies = ref([]);
    const visibleWishlistMovies = ref([]);
    const currentView = ref("grid");
    const currentPage = ref(1);
    const rowSize = ref(4);
    const moviesPerPage = ref(20);
    const isMobile = ref(window.innerWidth <= 768);

    const wishlist = wishListService;

    const loadWishlist = () => {
      wishlistMovies.value = wishlist.getCurrentWishlist();
      updateVisibleMovies();
    };

    const getImageUrl = (path) =>
      path
        ? `https://image.tmdb.org/t/p/w300${path}`
        : "/placeholder-image.jpg";

    const calculateLayout = () => {
      if (!gridContainer.value) return;

      const container = gridContainer.value;
      const containerWidth = container.offsetWidth;
      const containerHeight = window.innerHeight - container.offsetTop;
      const movieCardWidth = isMobile.value ? 90 : 220;
      const movieCardHeight = isMobile.value ? 150 : 330;
      const horizontalGap = isMobile.value ? 10 : 15;
      const verticalGap = -10;

      rowSize.value = Math.floor(
        containerWidth / (movieCardWidth + horizontalGap)
      );
      const maxRows = Math.floor(
        containerHeight / (movieCardHeight + verticalGap)
      );
      moviesPerPage.value = rowSize.value * maxRows;

      updateVisibleMovies();
    };

    const updateVisibleMovies = () => {
      const startIndex = (currentPage.value - 1) * moviesPerPage.value;
      const endIndex = startIndex + moviesPerPage.value;
      const paginatedMovies = wishlistMovies.value.slice(startIndex, endIndex);

      visibleWishlistMovies.value = paginatedMovies.reduce(
        (resultArray, item, index) => {
          const groupIndex = Math.floor(index / rowSize.value);
          if (!resultArray[groupIndex]) {
            resultArray[groupIndex] = [];
          }
          resultArray[groupIndex].push(item);
          return resultArray;
        },
        []
      );
    };

    const totalPages = computed(() =>
      Math.ceil(wishlistMovies.value.length / moviesPerPage.value)
    );

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        updateVisibleMovies();
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        updateVisibleMovies();
      }
    };

    const toggleWishlist = (movie) => {
      wishlist.toggleWishlist(movie);
      loadWishlist();
    };

    const isMovieInWishlist = (movieId) => {
      return wishlist.isInWishlist(movieId);
    };

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
      calculateLayout();
    };

    onMounted(() => {
      loadWishlist();
      calculateLayout();
      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      gridContainer,
      wishlistMovies,
      visibleWishlistMovies,
      currentView,
      currentPage,
      rowSize,
      moviesPerPage,
      totalPages,
      isMobile,
      getImageUrl,
      nextPage,
      prevPage,
      toggleWishlist,
      isMovieInWishlist,
    };
  },
};
</script>

<style scoped>
.wishlist-indicator {
  position: absolute;
  top: 10px; /* 하트 위치 조정 */
  right: 10px;
  width: 30px; /* 박스 너비 */
  height: 30px; /* 박스 높이 */
  font-size: 30px; /* 하트 크기 */
  color: #ff35e8;
  background-color: rgb(0, 0, 0);
  box-shadow: 0 0 5px rgb(115, 2, 102);
  display: flex; /* 내용 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
}

.movie-grid {
  width: 100%;
  height: calc(100vh - 200px);
  margin-bottom: 40px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-row {
  display: flex;
  justify-content: center;
  margin: 0 auto 20px;
  width: 100%;
}

.grid-container.list .movie-row {
  flex-direction: column;
}

.movie-card {
  width: 160px;
  margin: 0 10px;
  transition: transform 0.3s;
  position: relative;
}

.grid-container.list .movie-card {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
}

.grid-container.list .movie-card img {
  width: 100px;
  margin-right: 20px;
}

.movie-title {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.grid-container.list .movie-title {
  text-align: left;
  white-space: normal;
}

.empty-wishlist {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .movie-grid {
    width: 100%;
    height: calc(90svh - 200px);
    margin-bottom: 40px;
    margin-top: 30px;
  }

  .movie-card {
    width: 90px;
    margin: 0 5px;
  }

  .movie-title {
    font-size: 12px;
  }

  .pagination button {
    padding: 8px 12px;
    font-size: 14px;
  }

  .grid-container.list .movie-card img {
    width: 60px;
  }
}
</style>
