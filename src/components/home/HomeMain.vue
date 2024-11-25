<template>
  <div class="home">
    <AppBanner :movie="featuredMovie" />

    <MovieRow title="인기 영화" :fetchUrl="popularMoviesUrl" />
    <MovieRow title="최신 영화" :fetchUrl="newReleasesUrl" />
    <MovieRow title="액션 영화" :fetchUrl="actionMoviesUrl" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import AppBanner from "@/components/home/Banner.vue";
import MovieRow from "@/components/home/MovieRow.vue";
import { urlService } from "@/utils/URLService";

export default {
  name: "HomeMain",
  components: {
    AppBanner,
    MovieRow,
  },
  setup() {
    const apiKey = localStorage.getItem("TMDb-Key") || "";
    const featuredMovie = ref(null);
    const popularMoviesUrl = ref("");
    const newReleasesUrl = ref("");
    const actionMoviesUrl = ref("");
    const scrollListener = ref(null);

    const loadFeaturedMovie = async () => {
      try {
        featuredMovie.value = await urlService.fetchFeaturedMovie(apiKey);
        console.log("Featured movie loaded:", featuredMovie.value);
      } catch (error) {
        console.error("Error loading featured movie:", error);
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

    return {
      featuredMovie,
      popularMoviesUrl,
      newReleasesUrl,
      actionMoviesUrl,
    };
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
