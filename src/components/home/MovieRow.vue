<template>
  <div class="movie-row" v-if="!loading">
    <h2>{{ title }}</h2>
    <div class="slider-container">
      <!-- 슬라이더 좌우 버튼 -->
      <button
        class="slider-btn left-btn"
        @click="scrollLeft"
        v-if="canScrollLeft"
      >
        ◀
      </button>
      <div class="slider-window" ref="sliderWindow">
        <div
          class="movie-slider"
          ref="slider"
          :style="{ transform: `translateX(-${scrollAmount}px)` }"
        >
          <!-- 영화 카드 -->
          <div
            v-for="movie in movies"
            :key="movie.id"
            class="movie-card"
            @click="toggleWishlist(movie)"
          >
            <img
              :src="getImageUrl(movie.poster_path)"
              :alt="movie.title"
              @error="handleImageError"
            />
            <!-- 위시리스트 표시 -->
            <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">
              👍
            </div>
          </div>
        </div>
      </div>
      <button
        class="slider-btn right-btn"
        @click="scrollRight"
        v-if="canScrollRight"
      >
        ▶
      </button>
    </div>
  </div>
  <div v-else>
    <p>Loading movies...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { wishListService } from "@/utils/WishList";

export default defineComponent({
  name: "MovieRow",
  props: {
    title: {
      type: String,
      required: true,
    },
    fetchUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const movies = ref<any[]>([]);
    const scrollAmount = ref(0);
    const loading = ref(true);

    const slider = ref<HTMLDivElement | null>(null);
    const sliderWindow = ref<HTMLDivElement | null>(null);

    const canScrollLeft = computed(() => scrollAmount.value > 0);
    const canScrollRight = computed(() => {
      if (slider.value && sliderWindow.value) {
        const sliderWidth = slider.value.scrollWidth;
        const windowWidth = sliderWindow.value.clientWidth;
        return scrollAmount.value + windowWidth < sliderWidth;
      }
      return false;
    });

    const fetchMovies = async () => {
      try {
        if (!props.fetchUrl) {
          console.error("Invalid or missing fetchUrl.");
          return;
        }

        const apiKey = localStorage.getItem("TMDb-Key");
        if (!apiKey) {
          console.error("API Key is missing. Please log in.");
          return;
        }

        const response = await axios.get(`${props.fetchUrl}&api_key=${apiKey}`);
        movies.value = response.data.results;

        // 데이터 캐싱
        localStorage.setItem(
          `movies_${props.title}`,
          JSON.stringify(response.data.results)
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        loading.value = false;
      }
    };

    const getImageUrl = (path: string | null | undefined): string => {
      return path
        ? `https://image.tmdb.org/t/p/w300${path}`
        : "/default-image.jpg";
    };

    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement;
      target.src = "/default-image.jpg";
    };

    const toggleWishlist = (movie: any) => {
      wishListService.toggleWishlist(movie);
    };

    const isInWishlist = (movieId: number): boolean => {
      return wishListService.isInWishlist(movieId);
    };

    const scrollLeft = () => {
      if (sliderWindow.value) {
        const windowWidth = sliderWindow.value.clientWidth;
        scrollAmount.value = Math.max(0, scrollAmount.value - windowWidth);
      }
    };

    const scrollRight = () => {
      if (slider.value && sliderWindow.value) {
        const windowWidth = sliderWindow.value.clientWidth;
        const sliderWidth = slider.value.scrollWidth;
        scrollAmount.value = Math.min(
          scrollAmount.value + windowWidth,
          sliderWidth
        );
      }
    };

    onMounted(() => {
      fetchMovies();
      scrollAmount.value = 0;
    });

    return {
      movies,
      scrollAmount,
      loading,
      getImageUrl,
      handleImageError,
      toggleWishlist,
      isInWishlist,
      scrollLeft,
      scrollRight,
      canScrollLeft,
      canScrollRight,
    };
  },
});
</script>

<style scoped>
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

.movie-row {
  margin-bottom: 40px;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.movie-row h2 {
  text-align: left;
  margin-left: 30px;
}

.slider-container {
  position: relative;
  touch-action: pan-y;
}

.slider-window {
  overflow: hidden;
  margin: 0 40px;
}

.movie-slider {
  display: flex;
  transition: transform 0.3s ease;
  padding: 20px 0;
}

.movie-card {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 10px;
  transition: transform 0.3s;
  position: relative;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 20px 10px;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.3s, background-color 0.3s;
}

.slider-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.slider-button.left {
  left: 0;
}

.slider-button.right {
  right: 0;
}

.slider-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .movie-row {
    margin-bottom: 20px;
  }

  .movie-card {
    width: 120px;
    margin-right: 5px;
  }

  .movie-slider {
    padding: 0;
  }

  .slider-window {
    margin: 0 10px;
  }
}
</style>
