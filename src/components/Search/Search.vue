<template>
  <div class="container-search">
    <div class="container-search-bar">
      <MovieSearch @changeOptions="changeOptions" />
    </div>
    <div class="content-search">
      <MovieInfiniteScroll
        :apiKey="apiKey"
        :genreCode="genreId"
        :sortingOrder="sortId"
        :voteEverage="ageId"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import MovieSearch from "@/components/Search/MovieSearch.vue";
import MovieInfiniteScroll from "@/components/MovieInfiniteScroll.vue";

export default defineComponent({
  name: "Search",
  components: {
    MovieSearch,
    MovieInfiniteScroll,
  },
  setup() {
    const apiKey = ref(localStorage.getItem("TMDb-Key") || "");
    const genreId = ref("28");
    const ageId = ref(-1);
    const sortId = ref("all");

    const genreCode = {
      "장르 (전체)": 0,
      "액 션": 28,
      "판타지, 모험": 12,
      "코 미디": 35,
      "공 포": 80,
      "가 족": 10751,
    };
    const sortingCode = {
      "언 어": "all",
      En: "en",
      Ko: "ko",
    };

    const ageCode = {
      "평 점": -1,
      "9~10": 9,
      "8~9": 8,
      "7~8": 7,
      "6~7": 6,
      "5~6": 5,
      "4~5": 4,
      "4점 이하": -2,
    };

    const changeOptions = (options) => {
      genreId.value = genreCode[options.originalLanguage] || 0; // 매핑되지 않을 경우 기본값 사용
      ageId.value = ageCode[options.translationLanguage] || -1;
      sortId.value = sortingCode[options.sorting] || "all";
    };

    return {
      apiKey,
      genreId,
      ageId,
      sortId,
      changeOptions,
    };
  },
});
</script>

<style scoped>
.container-search {
  margin-top: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container-search-bar {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: right;
  margin-top: 10px;
}

.content-search {
  width: 100%;
}
</style>
