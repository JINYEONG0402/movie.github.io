<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/home/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style scoped></style>
