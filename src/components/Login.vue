<template>
  <div class="login">
    <h1>Enter TMDB API Key</h1>
    <input v-model="apiKey" type="password" placeholder="API Key" />
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { setApiKey } from "@/api/tmdb";

export default defineComponent({
  name: "LoginPage", // 여러 단어로 된 이름
  setup() {
    const router = useRouter();
    const store = useStore();
    const apiKey = ref("");

    const login = () => {
      setApiKey(apiKey.value);
      store.dispatch("saveApiKey", apiKey.value);
      router.push("/home");
    };

    return { apiKey, login };
  },
});
</script>

<style scoped>
.login {
  text-align: center;
  margin-top: 50px;
}
</style>
