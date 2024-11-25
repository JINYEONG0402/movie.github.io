import { createStore } from "vuex";

export default createStore({
  state: {
    apiKey: "",
  },
  mutations: {
    setApiKey(state, key: string) {
      state.apiKey = key;
    },
  },
  actions: {
    saveApiKey({ commit }, key: string) {
      commit("setApiKey", key);
    },
  },
});
