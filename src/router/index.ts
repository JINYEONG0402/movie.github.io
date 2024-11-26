import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/components/SignIn.vue";
import Home from "@/components/home/Home.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import Search from "@/components/Search/Search.vue";
import HomeWish from "@/components/WishList/HomeWishList.vue";
import { authGuard } from "@/router/guard"; // 인증 가드

const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter: authGuard, // 인증 가드
    children: [
      {
        path: "",
        name: "HomeMain",
        component: HomeMain,
      },
      {
        path: "wishlist",
        name: "HomeWish",
        component: HomeWish,
      },
      {
        path: "/Search",
        component: Search,
      },
    ],
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // 로그인 여부 확인
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 인증이 필요한 라우트에 접근 시 로그인 페이지로 이동
    next({ path: "/signIn" });
  } else {
    next();
  }
});

export default router;
