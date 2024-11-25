<template>
  <div class="search-results">
    <h1>Search Results</h1>
    <input
      v-model="query"
      @keyup.enter="searchMovies"
      placeholder="Enter movie name"
    />
    <button @click="searchMovies">Search</button>
    <div v-if="movies.length">
      <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-item">
          <img :src="getImageUrl(movie.poster_path)" alt="" />
          <h3>{{ movie.title }}</h3>
          <router-link :to="`/movie/${movie.id}`">View Details</router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No results found.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { fetchMovies } from "@/api/tmdb";

export default defineComponent({
  setup() {
    const query = ref("");
    const movies = ref<never[]>([]);

    const getImageUrl = (path: string) =>
      `https://image.tmdb.org/t/p/w500${path}`;

    const searchMovies = async () => {
      if (!query.value.trim()) return;
      const data = await fetchMovies("/search/movie", { query: query.value });
      movies.value = data.results;
    };

    return { query, movies, getImageUrl, searchMovies };
  },
});
</script>

<style scoped>
.search-results {
  text-align: center;
  margin: 20px;
}
input {
  padding: 10px;
  margin-right: 10px;
  width: 50%;
}
button {
  padding: 10px;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.movie-item {
  margin: 10px;
  text-align: center;
}
img {
  max-width: 150px;
}
</style>
