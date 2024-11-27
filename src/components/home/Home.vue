<template>
  <div id="app">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <div id="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/home/Header.vue"; // Header 컴포넌트 경로를 확인 후 변경

export default defineComponent({
  name: "Home",
  components: {
    Header, // Header 컴포넌트를 등록
  },
});
</script>

<style scoped>
#app {
  width: 94svw;
  height: 95svh;
  overflow-x: hidden;
  margin: 5px;

  @media (max-width: 390px) and (max-height: 844px) {
    width: 100vw; /* 뷰포트 전체 너비 사용 */
    height: 100vh; /* 뷰포트 전체 높이 사용 */
    margin: 0; /* 마진 제거 */
  }
}
#container {
  padding: 20px;
}
</style>
