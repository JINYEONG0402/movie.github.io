<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.VUE_APP_KAKAO_API_KEY);
    }
  },
};
</script>
