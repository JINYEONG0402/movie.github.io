<template>
  <div
    v-if="movie"
    class="banner"
    :style="{ backgroundImage: `url(${backdropUrl})` }"
  >
    <div class="banner-content">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
      <button class="play-btn title-btn">재생</button>
      <button class="info-btn title-btn">상세 정보</button>
    </div>
  </div>
  <div v-else>
    <p>Loading banner...</p>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    movie: {
      type: Object,
      required: false, // 필수로 설정하지 않음
      default: () => null, // 기본값으로 `null`을 설정
    },
  },
  computed: {
    backdropUrl() {
      return this.movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
        : "";
    },
  },
};
</script>

<style scoped>
.banner {
  height: 70vh;
  max-width: 100svw;
  background-size: cover;
  background-position: center;
  color: #ffffff;
  display: flex;
  align-items: flex-end;
  margin-top: 5px;
}

.banner-content {
  padding: 50px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.banner h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.banner p {
  font-size: 1rem;
  max-width: 500px;
  margin-bottom: 1rem;
  text-align: left;
}

.play-btn,
.info-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.play-btn {
  background-color: white;
  color: black;
}

.info-btn {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}

.title-btn {
  margin-top: 5px;
  width: 150px;
}

@media screen and (max-width: 390px) and (max-height: 844px) {
  .banner h1 {
    font-size: 2rem; /* 헤딩 폰트 크기를 아이폰 13 화면에 맞게 조정 */
    margin-bottom: 0.4rem; /* 여백 줄이기 */
  }

  .banner-content {
    padding: 10px; /* 패딩 축소 */
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      transparent 100%
    );
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .banner p {
    font-size: 0.85rem; /* 더 작은 폰트 크기 */
    max-width: 350px; /* 아이폰 13 화면 너비에 맞게 제한 */
    margin-bottom: 0.8rem; /* 여백 줄이기 */
    text-align: left;
  }

  .title-btn {
    margin-top: 4px;
    width: 90px; /* 버튼 너비 줄이기 */
    font-size: 0.7rem; /* 작은 버튼 폰트 크기 */
  }
}
</style>
