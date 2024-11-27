import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import "./styles.css";

const app = createApp(App);

// VueLazyload 설정
app.use(VueLazyload, {
  preLoad: 1.3, // 미리 로드할 범위
  error: "/default-image.jpg", // 로딩 실패 시 기본 이미지
  loading: "/loading-spinner.gif", // 로딩 중 이미지
  attempt: 1, // 로드 재시도 횟수
});

app.use(store).use(router).mount("#app");
