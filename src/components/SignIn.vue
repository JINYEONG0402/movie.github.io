<template>
  <div class="login-container">
    <h2>로그인</h2>
    <button @click="kakaoLogin" class="kakao-login-btn">카카오로 로그인</button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isLoggedIn = ref(false);
    const userNickname = ref("");
    const router = useRouter();

    const KAKAO_CLIENT_ID = "27d7fae4bb996ac3f5874f779a8f0df8";
    const KAKAO_REDIRECT_URI = "http://localhost:8080";

    const kakaoLogin = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_CLIENT_ID);
      }

      window.Kakao.Auth.login({
        success: (authObj) => {
          localStorage.setItem("kakao_token", authObj.access_token);
          fetchUserInfo();
        },
        fail: (error) => {
          console.error("카카오 로그인 실패:", error);
        },
      });
    };

    const fetchUserInfo = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_CLIENT_ID);
      }

      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (response) => {
          userNickname.value = response.kakao_account.profile.nickname;
          isLoggedIn.value = true;
        },
        fail: (error) => {
          console.error("사용자 정보 요청 실패:", error);
        },
      });
    };

    const logout = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_CLIENT_ID);
      }

      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
          localStorage.removeItem("kakao_token");
          isLoggedIn.value = false;
          userNickname.value = "";
          router.push("/");
        });
      } else {
        localStorage.removeItem("kakao_token");
        isLoggedIn.value = false;
        userNickname.value = "";
        router.push("/");
      }
    };

    const checkLoginState = () => {
      const kakaoToken = localStorage.getItem("kakao_token");
      if (kakaoToken) {
        localStorage.removeItem("kakao_token");
        isLoggedIn.value = false;
        userNickname.value = "";
      }
    };

    onMounted(() => {
      checkLoginState();
    });

    return {
      isLoggedIn,
      userNickname,
      kakaoLogin,
      logout,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #141414;
}

h2 {
  color: white;
  margin-bottom: 20px;
}

.kakao-login-btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fee500;
  transition: background-color 0.3s ease;
}

.kakao-login-btn:hover {
  background-color: #e6cf00;
}
</style>
