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
        <button class="icon-button" @click="toggleUserMenu">
          <font-awesome-icon icon="user" />
        </button>
        <button
          class="icon-button mobile-menu-button"
          @click="toggleMobileMenu"
        >
          <font-awesome-icon icon="bars" />
        </button>

        <!-- 로그아웃 버튼 -->
        <div v-if="showUserMenu" class="user-menu">
          <button class="logout-button" @click="removeKey">Logout</button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation -->
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

// 아이콘 등록
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
    const router = useRouter();

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value;
    };

    const removeKey = () => {
      localStorage.removeItem("TMDb-Key");
      router.push("/signin");
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isScrolled,
      isMobileMenuOpen,
      showUserMenu,
      toggleMobileMenu,
      toggleUserMenu,
      removeKey,
    };
  },
};
</script>

<style scoped>
/* Header Styling */
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

/* Desktop Navigation Styling */
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

/* Mobile Navigation Styling */
.mobile-menu-button {
  display: none;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: -100%; /* 숨겨진 상태 */
  width: 100%; /* 모바일 전체 너비 */
  height: 100%;
  background-color: #141414;
  z-index: 1001;
  transition: right 0.3s ease;
}

.mobile-nav.open {
  right: 0; /* 활성 상태 */
}

.mobile-nav ul {
  list-style-type: none;
  padding: 20px 0;
  margin: 0;
  text-align: center; /* 가운데 정렬 */
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

/* User Menu Styling */
.user-menu {
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: #141414;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.logout-button {
  background: none;
  border: none;
  color: #e5e5e5;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.logout-button:hover {
  color: #b3b3b3;
}

/* Responsive Styling */
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
