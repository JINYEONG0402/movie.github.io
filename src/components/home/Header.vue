<template>
  <div id="container">
    <header :class="['app-header', { scrolled: isScrolled }]">
      <div class="header-left">
        <div class="logo">
          <router-link to="/">
            <font-awesome-icon
              icon="cube"
              style="color: rgba(242, 0, 255, 0.8)"
            />
          </router-link>
        </div>
        <nav class="nav-links desktop-nav">
          <ul>
            <li><router-link to="/">홈</router-link></li>
            <li><router-link to="/popular">요즘 핫한</router-link></li>
            <li><router-link to="/wishlist">위시 리스트</router-link></li>
            <li><router-link to="/search">카테고리</router-link></li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <!-- 로그인 후 계정 정보 표시 -->
        <div v-if="isLoggedIn" class="user-info">
          <img
            v-if="userProfileImage"
            :src="userProfileImage"
            alt="프로필 이미지"
            class="profile-image-small"
          />
          <span class="profile-nickname">{{ userNickname }}</span>
          <button class="logout-button" @click="confirmLogout">로그아웃</button>
        </div>
        <!-- 로그인 전 유저 버튼 표시 -->
        <button v-else class="icon-button" @click="kakaoLogin">
          <font-awesome-icon icon="user" />
        </button>
      </div>
    </header>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faCube } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser, faCube);

export default {
  name: "AppHeader",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const isScrolled = ref(false);
    const isLoggedIn = ref(false);
    const userNickname = ref("");
    const userProfileImage = ref("");
    const router = useRouter();

    // 환경 변수 가져오기
    const KAKAO_CLIENT_ID = process.env.VUE_APP_KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = process.env.VUE_APP_KAKAO_REDIRECT_URI;

    // 환경 변수 검증
    if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
      console.error(
        "카카오 클라이언트 ID 또는 리다이렉트 URI 설정되지 않았습니다."
      );
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const kakaoLogin = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_CLIENT_ID);
      }

      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;

      console.log("Kakao Auth URL:", KAKAO_AUTH_URL); // 디버깅용
      window.location.href = KAKAO_AUTH_URL;
    };

    const handleRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const tokenResponse = await fetch(
            `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const tokenData = await tokenResponse.json();
          if (tokenData.access_token) {
            localStorage.setItem("kakao_token", tokenData.access_token);
            fetchUserInfo(tokenData.access_token);
          } else {
            console.error("토큰 요청 실패:", tokenData);
          }
        } catch (error) {
          console.error("토큰 요청 중 오류 발생:", error);
        }
      }
    };

    const fetchUserInfo = async (token) => {
      try {
        const response = await fetch("https://kapi.kakao.com/v2/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        userNickname.value = data.kakao_account.profile.nickname;
        userProfileImage.value = data.kakao_account.profile.profile_image_url;
        isLoggedIn.value = true;
      } catch (error) {
        console.error("사용자 정보 요청 실패:", error);
      }
    };

    const logout = () => {
      localStorage.removeItem("kakao_token");
      userNickname.value = "";
      userProfileImage.value = "";
      isLoggedIn.value = false;
      router.push("/");
    };

    const confirmLogout = () => {
      if (confirm("정말 로그아웃하시겠습니까?")) {
        logout();
      }
    };

    const checkLoginState = () => {
      const kakaoToken = localStorage.getItem("kakao_token");
      if (kakaoToken) {
        fetchUserInfo(kakaoToken);
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      handleRedirect();
      checkLoginState();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isScrolled,
      isLoggedIn,
      userNickname,
      userProfileImage,
      kakaoLogin,
      confirmLogout,
    };
  },
};
</script>

<style scoped>
.app-header {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 4%;
  background-color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  margin-right: 30px;
  font-size: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  color: white;
}

.user-info img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-nickname {
  font-size: 1rem;
  margin-right: 15px;
}

.logout-button {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: white;
  color: black;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
.nav-links {
  display: flex; /* 가로로 정렬 */
  gap: 20px; /* 각 항목 간격 */
  list-style: none; /* 기본 리스트 스타일 제거 */
  margin: 0; /* 여백 제거 */
  padding: 0; /* 여백 제거 */
}

.nav-links li {
  display: inline; /* 리스트 아이템을 가로로 배치 */
}

.nav-links a {
  color: white;
  text-decoration: none; /* 밑줄 제거 */
  font-size: 1rem;
  padding: 5px 10px; /* 간격 추가 */
  transition: color 0.3s ease; /* 색상 전환 효과 */
}

.nav-links a:hover {
  color: #f203ff; /* 마우스 호버 시 색상 변경 */
}
</style>
