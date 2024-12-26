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
import Header from "@/components/home/Header.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header,
  },
});
</script>

<style scoped>
#app {
  width: 94svw;
  height: 95svh;
  overflow-x: hidden;
  margin: 5px;

  /* 태블릿 또는 큰 화면 */
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 94vw;
    height: 95vh;
    margin: 5px;
  }

  /* 스마트폰 (일반적인 크기) */
  @media (max-width: 767px) {
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
  }

  /* 아이폰 SE, 작은 화면 */
  @media (max-width: 390px) and (max-height: 844px) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}

#container {
  padding: 20px;

  /* 태블릿 또는 큰 화면 */
  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 15px;
  }

  /* 스마트폰 (일반적인 크기) */
  @media (max-width: 767px) {
    padding: 10px;
  }

  /* 아이폰 SE, 작은 화면 */
  @media (max-width: 390px) and (max-height: 844px) {
    padding: 5px;
  }
}
#container {
  padding: 20px;
}
</style>
