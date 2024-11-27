<template>
  <div class="movie-grid" ref="gridContainer">
    <div :class="['grid-container', { list: currentView === 'list' }]">
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
          <img
            :src="getImageUrl(movie.poster_path)"
            :alt="movie.title || 'No Title Available'"
            loading="lazy"
          />
          <div class="movie-title">{{ movie.title }}</div>
        </div>
      </div>
    </div>
    <div ref="loadingTrigger" class="loading-trigger">
      <div v-if="isLoading" class="loading-indicator">
        <div class="spinner"></div>
        <span>Loading...</span>
      </div>
    </div>
    <button
      v-if="showTopButton"
      @click="scrollToTopAndReset"
      class="top-button"
      aria-label="맨 위로 이동"
    >
      Top
    </button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";

export default {
  name: "MovieInfiniteScroll",
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    genreCode: {
      type: String,
      default: "0",
    },
    sortingOrder: {
      type: String,
      default: "all",
    },
    voteAverage: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const movies = ref([]);
    const currentPage = ref(1);
    const rowSize = ref(4);
    const isLoading = ref(false);
    const hasMore = ref(true);
    const currentView = ref("grid");
    const showTopButton = ref(false);
    const gridContainer = ref(null);
    const wishlist = ref([]);
    let observer;

    const fetchMovies = async () => {
      if (isLoading.value || !hasMore.value) return;
      isLoading.value = true;

      try {
        const url =
          props.genreCode === "0"
            ? "https://api.themoviedb.org/3/movie/popular"
            : "https://api.themoviedb.org/3/discover/movie";

        const params = {
          api_key: props.apiKey,
          language: "ko-KR",
          page: currentPage.value,
        };

        if (props.genreCode !== "0") {
          params.with_genres = props.genreCode;
        }

        if (props.voteAverage > 0) {
          params["vote_average.gte"] = props.voteAverage;
          params["vote_average.lte"] = props.voteAverage + 1;
        }

        if (props.sortingOrder !== "all") {
          params.with_original_language = props.sortingOrder;
        }

        const response = await axios.get(url, { params });
        const newMovies = response.data.results;

        if (newMovies.length > 0) {
          movies.value = [...movies.value, ...newMovies];
          currentPage.value++;
        } else {
          hasMore.value = false;
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const visibleMovieGroups = computed(() =>
      chunkArray(movies.value, rowSize.value)
    );

    const chunkArray = (array, size) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
      }
      return chunks;
    };

    const getImageUrl = (path) =>
      path
        ? `https://image.tmdb.org/t/p/w300${path}`
        : "/placeholder-image.jpg";

    const toggleWishlist = (movie) => {
      if (wishlist.value.includes(movie.id)) {
        wishlist.value = wishlist.value.filter((id) => id !== movie.id);
      } else {
        wishlist.value.push(movie.id);
      }
      console.log("Current Wishlist:", wishlist.value);
    };

    const isInWishlist = (movieId) => wishlist.value.includes(movieId);

    const handleScroll = () => {
      const container = gridContainer.value;
      if (container) {
        const scrollTop = container.scrollTop;
        showTopButton.value = scrollTop > 300;
      }
    };

    const scrollToTopAndReset = () => {
      const container = gridContainer.value;
      if (container) {
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      movies.value = [];
      currentPage.value = 1;
      hasMore.value = true;
      fetchMovies();
    };

    const setupObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore.value && !isLoading.value) {
            fetchMovies();
          }
        },
        { root: gridContainer.value, rootMargin: "100px", threshold: 0.1 }
      );

      if (gridContainer.value) {
        observer.observe(gridContainer.value.querySelector(".loading-trigger"));
      }
    };

    onMounted(() => {
      fetchMovies();
      setupObserver();
      if (gridContainer.value) {
        gridContainer.value.addEventListener("scroll", handleScroll);
      }
    });

    onUnmounted(() => {
      if (observer) observer.disconnect();
      if (gridContainer.value) {
        gridContainer.value.removeEventListener("scroll", handleScroll);
      }
    });

    return {
      gridContainer,
      visibleMovieGroups,
      fetchMovies,
      getImageUrl,
      toggleWishlist,
      isInWishlist,
      scrollToTopAndReset,
      handleScroll,
      isLoading,
      showTopButton,
      rowSize,
      currentView,
    };
  },
};
</script>

<style scoped>
.movie-grid {
  width: 100%;
  margin-bottom: 40px;
  margin-top: 50px;
  overflow-y: auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-container.list {
  align-items: flex-start;
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
  width: 300px;
  margin: 0 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  overflow: hidden;
}

.grid-container.list .movie-card {
  width: 100%;
  margin: 10px 0;
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  display: block;
}

.loading-trigger {
  height: 20px;
  margin-top: 40px;
  text-align: center;
  display: block;
}

.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  font-size: 16px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(242, 0, 255, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 1000;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.top-button:hover {
  background-color: rgba(204, 0, 255, 0.8);
  transform: scale(1.1);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
