import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/components/Login.vue";
import Home from "@/components/home/Home.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import HomeWishlist from "@/components/WishList/HomeWishList.vue";

// 라우트 정의
const routes = [
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: true }, // 인증이 필요한 라우트
    children: [
      {
        path: "",
        component: HomeMain,
      },
      {
        path: "wishlist",
        component: HomeWishlist,
      },
    ],
  },
  {
    path: "/SignIn",
    component: SignIn,
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 전역 네비게이션 가드
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("TMDb-Key") !== null;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 인증이 필요한데 인증되지 않은 경우
    next({ path: "/signIn" });
  } else {
    // 인증되어 있거나 인증이 필요하지 않은 경우
    next();
  }
});

export default router;
