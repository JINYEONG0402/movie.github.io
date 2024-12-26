<template>
  <div class="movie-grid" ref="gridContainer">
    <!-- 로그인 상태 확인 -->
    <div v-if="!isLoggedIn" class="empty-wishlist">
      로그인이 필요한 서비스입니다.
    </div>
    <div v-else>
      <!-- 영화 리스트 렌더링 -->
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
              :class="{ active: isInWishlist(movie.id) }"
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
        <button @click="prevPage" :disabled="currentPage === 1">
          &lt; 이전
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          다음 &gt;
        </button>
      </div>
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
    const currentView = ref("grid");
    const currentPage = ref(1);
    const rowSize = ref(4);
    const moviesPerPage = ref(20);
    const isMobile = ref(window.innerWidth <= 768);

    // WishListService에서 데이터 가져오기
    const wishlistMovies = wishListService.wishlist$;

    // 로그인 여부 확인
    const isLoggedIn = computed(() => !!localStorage.getItem("kakao_token"));

    // 영화 포스터 URL 가져오기
    const getImageUrl = (path) =>
      path
        ? `https://image.tmdb.org/t/p/w300${path}`
        : "/placeholder-image.jpg";

    // 위시리스트 추가/제거
    const toggleWishlist = (movie) => {
      if (!isLoggedIn.value) {
        alert("위시리스트를 사용하려면 로그인이 필요합니다.");
        return;
      }
      wishListService.toggleWishlist(movie);
    };

    // 특정 영화가 위시리스트에 있는지 확인
    const isInWishlist = (movieId) => wishListService.isInWishlist(movieId);

    // 화면 크기에 따라 레이아웃 계산
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

    // 현재 페이지에 보일 영화 계산
    const updateVisibleMovies = () => {
      const startIndex = (currentPage.value - 1) * moviesPerPage.value;
      const endIndex = startIndex + moviesPerPage.value;
      const paginatedMovies = wishlistMovies.value.slice(startIndex, endIndex);

      return paginatedMovies.reduce((resultArray, item, index) => {
        const groupIndex = Math.floor(index / rowSize.value);
        if (!resultArray[groupIndex]) {
          resultArray[groupIndex] = [];
        }
        resultArray[groupIndex].push(item);
        return resultArray;
      }, []);
    };

    // 계산 속성: 현재 보이는 영화 그룹
    const visibleWishlistMovies = computed(() => updateVisibleMovies());

    // 계산 속성: 전체 페이지 수
    const totalPages = computed(() =>
      Math.ceil(wishlistMovies.value.length / moviesPerPage.value)
    );

    // 다음 페이지로 이동
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    // 이전 페이지로 이동
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // 화면 크기 변경 시 레이아웃 재계산
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
      calculateLayout();
    };

    onMounted(() => {
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
      isLoggedIn,
      getImageUrl,
      nextPage,
      prevPage,
      toggleWishlist,
      isInWishlist,
    };
  },
};
</script>

<style scoped>
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

.movie-card {
  width: 160px;
  margin: 0 10px;
  transition: transform 0.3s;
  position: relative;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
}

.movie-title {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-wishlist {
  text-align: center;
  font-size: 18px;
  margin-top: 100px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
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

.wishlist-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: #ffffff;
  background-color: rgb(0, 0, 0);
  box-shadow: 0 0 5px rgb(115, 2, 102);
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

  .wishlist-indicator {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
}
</style>
