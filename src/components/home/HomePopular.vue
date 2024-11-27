<template>
  <div class="popular-container">
    <!-- 뷰 전환 버튼 -->
    <div class="view-toggle">
      <button
        @click="setView('grid')"
        :class="{ active: currentView === 'grid' }"
      >
        <font-awesome-icon :icon="faTh" />
      </button>
      <button
        @click="setView('list')"
        :class="{ active: currentView === 'list' }"
      >
        <font-awesome-icon :icon="faBars" />
      </button>
    </div>

    <!-- 그리드 뷰 -->
    <MovieGrid
      v-if="currentView === 'grid'"
      :title="'인기 영화'"
      :fetch-url="fetchURL"
    />

    <!-- 리스트 뷰 (무한 스크롤) -->
    <MovieInfiniteScroll
      v-if="currentView === 'list'"
      :api-key="apiKey"
      :genre-code="genreCode"
      :sorting-order="sortingOrder"
      :vote-average="voteAverage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import MovieGrid from "@/views/MovieGrid.vue";
import MovieInfiniteScroll from "@/views/MovieInfiniteScroll.vue";
import { urlService } from "@/utils/URLService";

export default defineComponent({
  name: "Popular",
  components: {
    FontAwesomeIcon,
    MovieGrid,
    MovieInfiniteScroll,
  },
  setup() {
    const apiKey = localStorage.getItem("TMDb-Key") || ""; // API 키 가져오기
    const currentView = ref<"grid" | "list">("grid"); // 현재 뷰 상태
    const genreCode = ref("28"); // 기본 장르 코드
    const sortingOrder = ref("all"); // 기본 정렬 순서
    const voteAverage = ref(-1); // 기본 평점

    const fetchURL = computed(() => {
      return urlService.getURL4PopularMovies(apiKey); // URL 생성
    });

    const setView = (view: "grid" | "list") => {
      currentView.value = view; // 뷰 전환
    };

    return {
      faTh,
      faBars,
      apiKey,
      genreCode,
      sortingOrder,
      voteAverage,
      currentView,
      fetchURL,
      setView,
    };
  },
});
</script>

<style scoped>
.view-toggle {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.view-toggle button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #535bf2;
}
</style>
