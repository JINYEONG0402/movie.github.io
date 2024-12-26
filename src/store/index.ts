import { createStore } from "vuex";
import { AuthService } from "@/utils/AuthService";

export default createStore({
  state: {
    isLoggedIn: AuthService.isLoggedIn(),
    userNickname: "",
    userProfileImage: "",
    userEmail: "",
  },
  mutations: {
    login(state, userInfo) {
      state.isLoggedIn = true;
      state.userNickname = userInfo.nickname;
      state.userProfileImage = userInfo.profileImage;
      state.userEmail = userInfo.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userNickname = "";
      state.userProfileImage = "";
      state.userEmail = "";
    },
  },
  actions: {
    setLogin({ commit }, userInfo) {
      commit("login", userInfo);
    },
    setLogout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
  },
});
