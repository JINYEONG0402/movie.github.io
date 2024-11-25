<template>
  <div class="home">
    <h1>Popular Movies</h1>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img :src="getImageUrl(movie.poster_path)" alt="" />
        <h3>{{ movie.title }}</h3>
        <router-link :to="`/movie/${movie.id}`">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchMovies } from "@/api/tmdb";

export default defineComponent({
  name: "HomePage",
  setup() {
    const movies = ref([]);

    const getImageUrl = (path: string) =>
      `https://image.tmdb.org/t/p/w500${path}`;

    onMounted(async () => {
      const data = await fetchMovies("/movie/popular");
      movies.value = data.results;
    });

    return { movies, getImageUrl };
  },
});
</script>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
}
.movie-item {
  margin: 10px;
  text-align: center;
}
</style>
