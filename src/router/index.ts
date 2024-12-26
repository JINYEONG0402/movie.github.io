import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/components/SignIn.vue";
import Home from "@/components/home/Home.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import HomePopular from "@/components/home/HomePopular.vue";
import Search from "@/components/Search/Search.vue";
import HomeWish from "@/components/WishList/HomeWishList.vue";

const routes = [
  {
    path: "/",
    component: Home,
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
        path: "popular",
        name: "HomePopular",
        component: HomePopular,
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

export default router;
