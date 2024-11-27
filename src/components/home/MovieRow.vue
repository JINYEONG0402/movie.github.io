<template>
  <div class="movie-row">
    <!-- 제목 -->
    <h2 v-if="!loading">{{ title }}</h2>

    <!-- Skeleton UI 로딩 인디케이터 -->
    <div v-if="loading" class="loading-indicator">
      <div v-for="n in 5" :key="n" class="movie-card skeleton">
        <div class="skeleton-image"></div>
      </div>
    </div>

    <!-- 슬라이더 -->
    <div v-else-if="movies.length > 0" class="slider-container">
      <!-- 좌측 버튼 -->
      <button
        class="slider-button left"
        @click="scrollLeft"
        v-if="canScrollLeft"
      >
        ◀
      </button>

      <!-- 영화 슬라이더 -->
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
              :alt="movie.title || 'No Title Available'"
              loading="lazy"
              @error="handleImageError"
            />

            <!-- 위시리스트 표시 -->
            <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">
              👍
            </div>
          </div>
        </div>
      </div>

      <!-- 우측 버튼 -->
      <button
        class="slider-button right"
        @click="scrollRight"
        v-if="canScrollRight"
      >
        ▶
      </button>
    </div>

    <!-- 영화 데이터가 없을 때 -->
    <div v-else>
      <p>No movies available. Please try again later.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { wishListService } from "@/utils/WishList";
import { Movie } from "@/type/type";

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
    const movies = ref<Movie[]>([]); // 영화 데이터
    const scrollAmount = ref(0); // 슬라이더 스크롤 양
    const loading = ref(true); // 로딩 상태

    const slider = ref<HTMLDivElement | null>(null);
    const sliderWindow = ref<HTMLDivElement | null>(null);

    // 슬라이더 방향 버튼 활성화 여부
    const canScrollLeft = computed(() => scrollAmount.value > 0);
    const canScrollRight = computed(() => {
      if (slider.value && sliderWindow.value) {
        const sliderWidth = slider.value.scrollWidth || 0;
        const windowWidth = sliderWindow.value.clientWidth || 0;
        return scrollAmount.value + windowWidth < sliderWidth;
      }
      return false;
    });

    // 영화 데이터 가져오기
    const fetchMovies = async () => {
      try {
        const response = await axios.get(props.fetchUrl);
        movies.value = response.data.results || [];
      } catch (error) {
        console.error("Error fetching movies:", error);
        movies.value = []; // 실패 시 빈 배열로 초기화
      } finally {
        loading.value = false;
      }
    };

    // 이미지 URL 생성
    const getImageUrl = (path: string | null | undefined): string => {
      return path
        ? `https://image.tmdb.org/t/p/w300${path}`
        : "/default-image.jpg";
    };

    // 이미지 로딩 실패 핸들러
    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement;
      target.src = "/default-image.jpg";
    };

    // 위시리스트 토글
    const toggleWishlist = (movie: Movie) => {
      wishListService.toggleWishlist(movie);
    };

    // 위시리스트 확인
    const isInWishlist = (movieId: number): boolean => {
      return wishListService.isInWishlist(movieId);
    };

    // 슬라이더 왼쪽으로 이동
    const scrollLeft = () => {
      if (sliderWindow.value) {
        const windowWidth = sliderWindow.value.clientWidth;
        scrollAmount.value = Math.max(0, scrollAmount.value - windowWidth);
      }
    };

    // 슬라이더 오른쪽으로 이동
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

    // 컴포넌트 마운트 시 영화 데이터 가져오기
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
.loading-indicator {
  display: flex;
  gap: 10px;
  padding: 20px;
}

.movie-row h2 {
  margin-left: 20px;
  color: white;
}

.slider-container {
  position: relative;
  margin: 20px 0;
}

.slider-window {
  overflow: hidden;
  margin: 0 20px;
}

.movie-slider {
  display: flex;
  transition: transform 0.01s ease;
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

/* 버튼 스타일 */
.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
}
</style>
