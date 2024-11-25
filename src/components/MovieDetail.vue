<template>
  <div class="movie-detail">
    <div v-if="movie">
      <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" />
      <h1>{{ movie.title }}</h1>
      <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
      <p><strong>Rating:</strong> {{ movie.vote_average }}</p>
      <p><strong>Overview:</strong></p>
      <p>{{ movie.overview }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchMovies } from "@/api/tmdb";
import { Movie } from "@/type/movie"; // Movie 타입을 가져옵니다.

export default defineComponent({
  setup() {
    const route = useRoute();
    const movie = ref<Movie | null>(null); // 명시적으로 타입을 정의합니다.

    const getImageUrl = (path: string) =>
      `https://image.tmdb.org/t/p/w500${path}`;

    onMounted(async () => {
      const movieId = route.params.id;
      movie.value = await fetchMovies(`/movie/${movieId}`);
    });

    return { movie, getImageUrl };
  },
});
</script>

<style scoped>
.movie-detail {
  text-align: center;
  margin: 20px;
}
img {
  max-width: 300px;
  margin: 10px auto;
}
</style>
