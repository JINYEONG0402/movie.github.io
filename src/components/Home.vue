<template>
  <div>
    <h1>Popular Movies</h1>
    <div v-if="movies.length">
      <div v-for="movie in movies" :key="movie.id" class="movie">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p>{{ movie.title }}</p>
      </div>
    </div>
    <p v-else>Loading movies...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "HomePage",
  props: {
    apiKey: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const movies = ref([]);

    const loadMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: props.apiKey, // Use the passed API key
            },
          }
        );
        movies.value = response.data.results;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        alert("영화 데이터를 불러올 수 없습니다. API 키를 확인하세요.");
      }
    };

    onMounted(() => {
      loadMovies();
    });

    return { movies };
  },
});
</script>

<style scoped>
.movie {
  margin: 10px;
  display: inline-block;
  text-align: center;
}
.movie img {
  width: 200px;
  height: auto;
  border-radius: 10px;
}
</style>
