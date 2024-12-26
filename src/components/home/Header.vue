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
        <button class="hamburger-menu" @click="toggleMobileMenu">
          <font-awesome-icon icon="bars" />
        </button>
        <nav class="nav-links mobile-nav" :class="{ open: isMobileMenuOpen }">
          <ul>
            <li><router-link to="/">홈</router-link></li>
            <li><router-link to="/popular">요즘 핫한</router-link></li>
            <li><router-link to="/wishlist">위시 리스트</router-link></li>
            <li><router-link to="/search">카테고리</router-link></li>
          </ul>
        </nav>
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
import { faUser, faCube, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser, faCube, faBars);

export default {
  name: "AppHeader",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const isLoggedIn = ref(false);
    const userNickname = ref("");
    const userProfileImage = ref("");
    const router = useRouter();

    const KAKAO_CLIENT_ID = process.env.VUE_APP_KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = process.env.VUE_APP_KAKAO_REDIRECT_URI;

    if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
      console.error(
        "카카오 클라이언트 ID 또는 리다이렉트 URI 설정되지 않았습니다."
      );
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const kakaoLogin = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_CLIENT_ID);
      }

      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;

      console.log("Kakao Auth URL:", KAKAO_AUTH_URL);
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
      isMobileMenuOpen,
      toggleMobileMenu,
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
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links ul {
  display: flex;
  flex-direction: row;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 5px 10px;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #f203ff;
}

.hamburger-menu {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-nav {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: #000;
  padding: 10px;
  border-top: 1px solid #333;
}

.mobile-nav.open {
  display: flex;
}

@media screen and (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }

  .desktop-nav {
    display: none;
  }
}
</style>
