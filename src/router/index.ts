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
        path: "",
        name: "HomeWish",
        component: HomeWish,
      },
    ],
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/Search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
