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
        <div v-if="showUserMenu" class="user-menu">
          <button v-if="!isLoggedIn" class="login-button" @click="kakaoLogin">
            카카오로 로그인
          </button>
          <div v-else class="user-info-menu">
            <div class="user-profile">
              <img
                v-if="userProfileImage"
                :src="userProfileImage"
                alt="프로필 이미지"
                class="profile-image"
              />
            </div>
            <button class="logout-button" @click="logout">로그아웃</button>
            <div v-if="userNickname" class="user-nickname-display">
              <span>안녕하세요, {{ userNickname }}님!</span>
            </div>
          </div>
        </div>

        <button v-if="!isLoggedIn" class="icon-button" @click="toggleUserMenu">
          <font-awesome-icon icon="user" />
        </button>
        <div v-else class="user-info">
          <img
            v-if="userProfileImage"
            :src="userProfileImage"
            alt="프로필 이미지"
            class="profile-image-small"
          />
          <span class="profile_nickname">{{ userNickname }}</span>
          <button class="icon-button" @click="toggleUserMenu">
            <font-awesome-icon icon="user" />
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-nav" :class="{ open: isMobileMenuOpen }">
      <button class="close-button" @click="toggleMobileMenu">
        <font-awesome-icon icon="times" />
      </button>
      <nav>
        <ul>
          <li>
            <router-link to="/" @click="toggleMobileMenu">홈</router-link>
          </li>
          <li>
            <router-link to="/popular" @click="toggleMobileMenu"
              >요즘 핫한</router-link
            >
          </li>
          <li>
            <router-link to="/wishlist" @click="toggleMobileMenu"
              >위시 리스트</router-link
            >
          </li>
          <li>
            <router-link to="/search" @click="toggleMobileMenu"
              >카테고리</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faUser,
  faTicket,
  faCube,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch, faUser, faCube, faTicket, faBars, faTimes);

export default {
  name: "AppHeader",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const showUserMenu = ref(false);
    const isLoggedIn = ref(false);
    const userNickname = ref("");
    const userEmail = ref("");
    const userProfileImage = ref("");
    const router = useRouter();

    const KAKAO_CLIENT_ID = "27d7fae4bb996ac3f5874f779a8f0df8";
    const KAKAO_REDIRECT_URI = "http://localhost:8080/home";

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value;
    };

    const kakaoLogin = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_CLIENT_ID);
      }
      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email&prompt=login`;
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
            isLoggedIn.value = true;
            fetchUserInfo();
          }
        } catch (error) {
          console.error("토큰 요청 실패:", error);
        }
      }
    };

    const fetchUserInfo = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_CLIENT_ID);
      }

      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (response) => {
          const userInfo = {
            id: response.id,
            nickname: response.kakao_account.profile.nickname,
            profileImage: response.kakao_account.profile.profile_image_url,
            email: response.kakao_account.email,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          userNickname.value = userInfo.nickname;
          userProfileImage.value = userInfo.profileImage;
          userEmail.value = userInfo.email;
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
          localStorage.removeItem("userInfo");
          isLoggedIn.value = false;
          userNickname.value = "";
          userEmail.value = "";
          userProfileImage.value = "";
          router.push("/");
        });
      } else {
        localStorage.removeItem("kakao_token");
        localStorage.removeItem("userInfo");
        isLoggedIn.value = false;
        userNickname.value = "";
        userEmail.value = "";
        userProfileImage.value = "";
        router.push("/");
      }
    };

    const checkLoginState = () => {
      const kakaoToken = localStorage.getItem("kakao_token");
      if (kakaoToken) {
        isLoggedIn.value = true;
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
          userNickname.value = userInfo.nickname;
          userEmail.value = userInfo.email;
          userProfileImage.value = userInfo.profileImage;
        } else {
          fetchUserInfo();
        }
      } else {
        isLoggedIn.value = false;
        userNickname.value = "";
        userEmail.value = "";
        userProfileImage.value = "";
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
      showUserMenu,
      isLoggedIn,
      userNickname,
      userEmail,
      userProfileImage,
      toggleMobileMenu,
      toggleUserMenu,
      kakaoLogin,
      logout,
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
}

.user-nickname {
  color: white;
  font-weight: bold;
  margin-right: 10px;
  font-size: 0.85rem;
}

.nav-links ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
  text-shadow: 3px 3px 6px rgb(255, 53, 232);
}

.nav-links a:hover {
  color: #b3b3b3;
}
.user-nickname-display {
  margin-top: 5px;
  font-size: 0.85rem;
  color: #ffffff;
  text-align: center;
}

.mobile-menu-button {
  display: none;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background-color: #141414;
  z-index: 1001;
  transition: right 0.3s ease;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav ul {
  list-style-type: none;
  padding: 20px 0;
  margin: 0;
  text-align: center;
}

.mobile-nav li {
  margin: 20px 0;
}

.mobile-nav a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  padding: 10px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.user-menu {
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: #141414;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.login-button,
.logout-button {
  background: none;
  border: none;
  color: #e5e5e5;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 10px;
}

.login-button:hover,
.logout-button:hover {
  background-color: #2c2c2c;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-nav {
    display: block;
  }

  .icon-button {
    font-size: 0.75rem;
    margin-left: 10px;
  }

  a {
    text-align: left;
    font-size: 1.15rem !important;
  }
}
</style>
