<template>
  <div class="home">
    <Banner :movie="featuredMovie" />
    <MovieRow title="인기영화" :fetchUrl="popularMoviesUrl" />
    <MovieRow title="신작" :fetchUrl="newReleasesUrl" />
    <MovieRow title="액션영화" :fetchUrl="actionMoviesUrl" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import Banner from "@/components/home/Banner.vue";
import MovieRow from "@/components/home/MovieRow.vue";
import { urlService } from "@/utils/URLService";

export default {
  name: "HomeMain",
  components: { Banner, MovieRow },
  setup() {
    const apiKey = localStorage.getItem("TMDb-Key");
    const featuredMovie = ref({
      title: "",
      overview: "",
      backdrop_path: "",
    });
    const popularMoviesUrl = ref("");
    const newReleasesUrl = ref("");
    const actionMoviesUrl = ref("");
    const scrollListener = ref(null);

    const loadFeaturedMovie = async () => {
      try {
        if (!apiKey) {
          alert("API Key missing. Redirecting to login.");
          location.href = "/signIn";
          return;
        }
        featuredMovie.value = await urlService.fetchFeaturedMovie(apiKey);
      } catch (error) {
        console.error("Failed to load featured movie:", error);
      }
    };

    const initializeScrollListener = () => {
      scrollListener.value = () => {
        const header = document.querySelector(".app-header");
        if (window.scrollY > 50) {
          header?.classList.add("scrolled");
        } else {
          header?.classList.remove("scrolled");
        }
      };
      window.addEventListener("scroll", scrollListener.value);
    };

    onMounted(() => {
      popularMoviesUrl.value = urlService.getURL4PopularMovies(apiKey);
      newReleasesUrl.value = urlService.getURL4ReleaseMovies(apiKey);
      actionMoviesUrl.value = urlService.getURL4GenreMovies(apiKey, "28");
      loadFeaturedMovie();
      initializeScrollListener();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", scrollListener.value);
    });

    return { featuredMovie, popularMoviesUrl, newReleasesUrl, actionMoviesUrl };
  },
};
</script>

<style scoped>
.home {
  display: block;
}

body {
  background-color: #141414;
  overflow-y: scroll;
}
</style>
