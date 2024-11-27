<template>
  <div class="home">
    <Banner :movie="featuredMovie" />

    <section class="movie-section">
      <h2>인기영화</h2>
      <div class="movie-row">
        <div
          v-for="movie in popularMovies"
          :key="movie.id"
          class="movie-card"
          @click="toggleWishlist(movie)"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <p>{{ movie.title }}</p>
          <span
            class="wishlist-indicator"
            :class="{ active: isInWishlist(movie.id) }"
          >
            ♥
          </span>
        </div>
      </div>
    </section>

    <section class="movie-section">
      <h2>신작</h2>
      <div class="movie-row">
        <div
          v-for="movie in newReleases"
          :key="movie.id"
          class="movie-card"
          @click="toggleWishlist(movie)"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <p>{{ movie.title }}</p>
          <span
            class="wishlist-indicator"
            :class="{ active: isInWishlist(movie.id) }"
          >
            ♥
          </span>
        </div>
      </div>
    </section>

    <section class="movie-section">
      <h2>액션영화</h2>
      <div class="movie-row">
        <div
          v-for="movie in actionMovies"
          :key="movie.id"
          class="movie-card"
          @click="toggleWishlist(movie)"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <p>{{ movie.title }}</p>
          <span
            class="wishlist-indicator"
            :class="{ active: isInWishlist(movie.id) }"
          >
            ♥
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Banner from "@/components/home/Banner.vue";
import { urlService } from "@/utils/URLService";
import { wishListService } from "@/utils/WishList"; // 위시리스트 서비스 임포트

export default {
  name: "HomeMain",
  components: { Banner },
  setup() {
    const apiKey = localStorage.getItem("TMDb-Key");
    const featuredMovie = ref({
      title: "",
      overview: "",
      backdrop_path: "",
    });
    const popularMovies = ref([]);
    const newReleases = ref([]);
    const actionMovies = ref([]);

    const loadMovies = async () => {
      try {
        if (!apiKey) {
          alert("API Key missing. Redirecting to login.");
          location.href = "/signIn";
          return;
        }

        // Fetch Popular Movies
        const popularResponse = await fetch(
          urlService.getURL4PopularMovies(apiKey)
        );
        popularMovies.value = (await popularResponse.json()).results;

        // Fetch New Releases
        const newReleasesResponse = await fetch(
          urlService.getURL4ReleaseMovies(apiKey)
        );
        newReleases.value = (await newReleasesResponse.json()).results;

        // Fetch Action Movies
        const actionResponse = await fetch(
          urlService.getURL4GenreMovies(apiKey, "28")
        );
        actionMovies.value = (await actionResponse.json()).results;

        // Set 5th movie from popularMovies as the featured movie
        if (popularMovies.value.length >= 5) {
          const fifthMovie = popularMovies.value[4];
          featuredMovie.value = {
            title: fifthMovie.title,
            overview: fifthMovie.overview,
            backdrop_path: fifthMovie.backdrop_path,
          };
        }
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    };

    // 위시리스트 토글
    const toggleWishlist = (movie) => {
      wishListService.toggleWishlist(movie);
    };

    // 위시리스트 확인
    const isInWishlist = (movieId) => {
      return wishListService.isInWishlist(movieId);
    };

    onMounted(() => {
      loadMovies();
    });

    return {
      featuredMovie,
      popularMovies,
      newReleases,
      actionMovies,
      toggleWishlist,
      isInWishlist,
    };
  },
};
</script>

<style scoped>
.home {
  display: block;
}

.movie-section {
  margin-bottom: 30px;
}

.movie-row {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px;
  scrollbar-width: thin;
  scrollbar-color: #730266 #1e1e1e;
}

.movie-card {
  flex: 0 0 auto;
  width: 150px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.wishlist-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: #ffffff;
  background-color: rgb(0, 0, 0);
  box-shadow: 0 0 5px rgb(115, 2, 102);
  display: flex;
  opacity: 0.7;
  align-items: center;
  justify-content: center;
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
}

.wishlist-indicator.active {
  color: rgb(255, 53, 232);
  background-color: rgb(0, 0, 0);
  box-shadow: 0 0 5px rgb(255, 53, 232);
  transform: scale(1.1);
}
@media screen and (max-width: 390px) and (max-height: 844px) {
  .movie-row {
    gap: 8px; /* 카드 간격 더 줄이기 */
    padding: 5px; /* 패딩 최소화 */
  }

  .movie-card {
    width: 100px; /* 더 작은 카드 크기 */
  }

  .movie-card img {
    border-radius: 6px; /* 이미지 모서리 둥글게 */
  }

  .movie-card p {
    font-size: 0.7rem; /* 텍스트 크기 줄이기 */
  }

  .wishlist-indicator {
    width: 20px; /* 아이콘 크기 더 줄이기 */
    height: 20px;
    font-size: 20px;
  }
}
</style>
