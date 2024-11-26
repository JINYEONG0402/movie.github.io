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
  width: 95svw;
  height: 95svh;
  overflow-x: hidden;
  margin: auto;
  background-color: #2e2e2e;
}
#container {
  padding: 20px;
}
</style>
