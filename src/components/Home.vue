<template>
  <div class="movie-home">
    <h1>Welcome to Movie Homepage</h1>
    <div v-if="movies.length">
      <div v-for="movie in movies" :key="movie.id" class="movie">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
    <div v-else>
      <p>Loading movies...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

export default defineComponent({
  name: "MovieHome",
  setup() {
    const route = useRoute();
    const movies = ref([]);
    const apiKey = route.query.apiKey as string;

    const fetchMovies = async () => {
      if (!apiKey) {
        alert("API 키가 없습니다. 로그인 페이지로 이동합니다.");
        await router.push({ name: "Login" });
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`
        );
        if (!response.ok) throw new Error("API 요청에 실패했습니다.");
        const data = await response.json();
        movies.value = data.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
        alert("API 키가 유효하지 않습니다. 다시 로그인 해주세요.");
        await router.push({ name: "Login" });
      }
    };

    onMounted(fetchMovies);

    return {
      movies,
    };
  },
});
</script>

<style scoped>
.movie-home {
  text-align: center;
  padding: 20px;
}

.movie {
  display: inline-block;
  margin: 10px;
  width: 200px;
}

.movie img {
  width: 100%;
  border-radius: 10px;
}

.movie h3 {
  font-size: 16px;
  margin-top: 10px;
}
</style>
