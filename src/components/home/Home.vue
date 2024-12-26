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

  @media (max-width: 390px) and (max-height: 844px) {
    width: 100vw;
    height: 100vh;
    margin: 0;
  }
}
#container {
  padding: 20px;
}
</style>
