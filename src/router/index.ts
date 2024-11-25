import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import MovieDetail from "../components/MovieDetail.vue";
import SearchResults from "../components/SearchResults.vue";

// 라우트 설정
const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/home", name: "Home", component: Home },
  { path: "/movie/:id", name: "MovieDetail", component: MovieDetail },
  { path: "/search", name: "SearchResults", component: SearchResults },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 기본 내보내기
export default router;
