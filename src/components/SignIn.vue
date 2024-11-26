<template>
  <div>
    <div class="bg-image"></div>
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <!-- 로그인 카드 -->
          <div :class="['card', { hidden: !isLoginVisible }]" id="login">
            <form @submit.prevent="handleLogin">
              <h1>로그인</h1>
              <div class="input" :class="{ active: isEmailFocused || email }">
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  @focus="focusInput('email')"
                  @blur="blurInput('email')"
                />
                <label for="email">Email</label>
              </div>
              <div class="input" :class="{ active: isApiKeyFocused || apiKey }">
                <input
                  id="api-key"
                  type="password"
                  v-model="apiKey"
                  @focus="focusInput('apiKey')"
                  @blur="blurInput('apiKey')"
                />
                <label for="api-key">Password</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="remember" v-model="rememberMe" />
                <label for="remember" class="read-text">자동저장</label>
              </span>
              <button :disabled="!isLoginFormValid">Login</button>
            </form>
            <!-- 회원가입으로 이동 -->
            <a
              href="javascript:void(0)"
              class="account-check"
              @click="toggleCard"
            >
              계정이 있으신가요? <b>로그인</b>
            </a>
          </div>

          <!-- 회원가입 카드 -->
          <div :class="['card', { hidden: isLoginVisible }]" id="register">
            <form @submit.prevent="handleRegister">
              <h1>Sign up</h1>
              <div
                class="input"
                :class="{ active: isRegisterEmailFocused || registerEmail }"
              >
                <input
                  id="register-email"
                  type="email"
                  v-model="registerEmail"
                  @focus="focusInput('registerEmail')"
                  @blur="blurInput('registerEmail')"
                />
                <label for="register-email">Email</label>
              </div>
              <div
                class="input"
                :class="{
                  active: isRegisterPasswordFocused || registerPassword,
                }"
              >
                <input
                  id="register-password"
                  type="password"
                  v-model="registerPassword"
                  @focus="focusInput('registerPassword')"
                  @blur="blurInput('registerPassword')"
                />
                <label for="register-password">Password</label>
              </div>
              <div class="input" :class="{ active: isApiKeyFocused || apiKey }">
                <input
                  id="api-key"
                  type="text"
                  v-model="apiKey"
                  @focus="focusInput('apiKey')"
                  @blur="blurInput('apiKey')"
                />
                <label for="api-key">한번 더 입력</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="terms" v-model="acceptTerms" />
                <label for="terms" class="read-text"> 동의하기 <b></b> </label>
              </span>
              <button :disabled="!isRegisterFormValid">회원가입</button>
            </form>
            <!-- 로그인으로 이동 -->
            <a
              href="javascript:void(0)"
              class="account-check"
              @click="toggleCard"
            >
              가입하셨나요? <b>회원가입</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/utils/AuthService";

const router = useRouter();
const isLoginVisible = ref(true); // 현재 카드 상태 (true: 로그인, false: 회원가입)

const email = ref("");
const apiKey = ref("");
const registerEmail = ref("");
const registerPassword = ref("");
const rememberMe = ref(false);
const acceptTerms = ref(false);

const isEmailFocused = ref(false);
const isApiKeyFocused = ref(false);
const isRegisterEmailFocused = ref(false);
const isRegisterPasswordFocused = ref(false);

const toggleCard = () => {
  isLoginVisible.value = !isLoginVisible.value; // 카드 전환
};

const focusInput = (inputName) => {
  if (inputName === "email") isEmailFocused.value = true;
  if (inputName === "apiKey") isApiKeyFocused.value = true;
  if (inputName === "registerEmail") isRegisterEmailFocused.value = true;
  if (inputName === "registerPassword") isRegisterPasswordFocused.value = true;
};

const blurInput = (inputName) => {
  if (inputName === "email") isEmailFocused.value = false;
  if (inputName === "apiKey") isApiKeyFocused.value = false;
  if (inputName === "registerEmail") isRegisterEmailFocused.value = false;
  if (inputName === "registerPassword") isRegisterPasswordFocused.value = false;
};

// 로그인 폼 유효성 검사
const isLoginFormValid = computed(() => email.value && apiKey.value);
// 회원가입 폼 유효성 검사
const isRegisterFormValid = computed(
  () =>
    registerEmail.value &&
    registerPassword.value &&
    apiKey.value &&
    acceptTerms.value
);

const handleLogin = async () => {
  try {
    const isValidApiKey = await authService.validateApiKey(apiKey.value);
    if (!isValidApiKey) {
      alert("Invalid TMDB API Key");
      return;
    }
    const user = await authService.tryLogin(email.value, apiKey.value);
    localStorage.setItem("TMDb-Key", apiKey.value);
    router.push("/");
  } catch (err) {
    alert(err.message);
  }
};

const handleRegister = async () => {
  try {
    const isValidApiKey = await authService.validateApiKey(apiKey.value);
    if (!isValidApiKey) {
      alert("Invalid TMDB API Key");
      return;
    }
    await authService.tryRegister(
      registerEmail.value,
      registerPassword.value,
      apiKey.value
    );
    alert("Registration successful! Please log in.");
    toggleCard(); // 회원가입 후 로그인 페이지로 전환
  } catch (err) {
    alert(err.message);
  }
};
</script>

<style scoped>
:root {
  --container-start-x: -50%;
  --container-end-x: -90%;
  --container-start-y: -58%;
  --container-end-y: -42%;
  --container-start-color: #ececec;
  --container-end-color: #100f0f;
}

.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/designecologist-Pmh0UoG1vlE-unsplash.jpg");
  background-size: cover;
  background-position: center;
}
.bg-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(32, 0, 51, 0.9);
}

a {
  text-decoration: none;
  margin: 0;
  padding: 0;
}

.container {
  height: 80svh;
  width: 100svw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#phone {
  width: 50svw;
  max-width: 80dvh;
  max-height: 50dvh;
  aspect-ratio: 3.35 / 4;
  border-radius: min(2.5cqw, 2cqh);
  text-align: center;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

@media (max-height: 600px) {
  #phone {
    transform: translate(-50%, -50%) scale(0.5); /* Scale down on small screens */
  }
}

@media (max-height: 400px) {
  #phone {
    transform: translate(-50%, -50%) scale(0.3); /* Further scale down */
  }
}

#content-wrapper {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}

input {
  font-size: 1.2rem;
  font-weight: 600;
  color: #a7a7af;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 2.5rem;
  padding: 0;
  margin: 0;
}

.read-text {
  display: flex;
  align-items: center;
  justify-content: center;
  text-indent: 10px; /* 원하는 들여쓰기 크기로 조정하세요 */
  color: #ffffff !important;
  font-weight: 900;
}

h1 {
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-top: 0;

  color: #ffffff;
}

button {
  display: block;
  border-radius: 50px;
  border: none;
  width: 100%;
  background-color: rgba(242, 0, 255, 0.8);
  color: rgb(255, 255, 255);
  padding: 17px;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 30px rgba(97, 23, 209, 0.3);
  transition: all 0.2s ease;
}

button:hover {
  box-shadow: 0 2px 10px rgba(119, 23, 209, 0.4);
}

.input {
  position: relative;
  margin-top: 1.5rem;
}

.line-active {
  border-bottom: 1px solid rgba(32, 0, 51, 0.9) !important;
  box-shadow: 0 1px 0 rgba(119, 23, 209, 0.4) !important;
}

.input input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  border-radius: 0;
  outline: none;
  height: 2.5rem;
  width: 100%;
  font-size: 1rem;
  padding: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  box-sizing: content-box;
  transition: all 0.3s ease;
}

.input label {
  color: #9e9e9e;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  font-size: 1rem;
  cursor: text;
  transition: transform 0.2s ease-out;
  transform-origin: 0 100%;
  text-align: initial;
  transform: translateY(12px);
  pointer-events: none;
}

.label-active {
  transform: translateY(-14px) scale(0.8) !important;
  transform-origin: 0 0 !important;
}

.label-blue {
  color: rgba(242, 0, 255, 0.8) !important;
}

[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

[type="checkbox"] + label {
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  display: inline-block;
  height: 25px;
  line-height: 22px;
  font-size: 1rem;
  user-select: none;
}

[type="checkbox"] + label:before,
[type="checkbox"]:not(.filled-in) + label:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  z-index: 0;
  border: 2px solid #5a5a5a;
  border-radius: 3px;
  margin-top: 2px;
  transition: 0.2s;
}

[type="checkbox"]:not(.filled-in) + label:after {
  border: 0;
  transform: scale(0);
}

[type="checkbox"]:checked + label:before {
  top: -4px;
  left: -5px;
  width: 12px;
  height: 22px;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid rgba(242, 0, 255, 0.8);
  border-bottom: 2px solid rgba(242, 0, 255, 0.8);
  transform: rotate(40deg);
  backface-visibility: hidden;
  transform-origin: 100% 100%;
  border-radius: 1px;
}

.checkbox {
  margin-top: 2rem;
  display: block;
  margin-bottom: 2rem;
}

.remember {
  float: left;
}

.forgot {
  float: right;
}

.forgot a {
  text-decoration: none;
  color: #000;
  font-weight: 900;
  line-height: 22px;
}

.card {
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  position: absolute;
  background-color: #000000;
  padding: 27px 30px 46px 30px;
  box-shadow: 0 5px 10px rgb(255, 53, 232);
  transition: all 0.4s 0.1s ease;

  top: 50%;

  left: 50%;
  transform: translateX(-50%);
}

.card form {
  transform: translateX(0px);
  transition: all 0.3s 0.4s ease;
}

#login {
  z-index: 2;
  top: 5svh;
}

#register {
  z-index: 2;
  top: 5svh;
}

.account-check {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 15px;
  left: 0;
  opacity: 0;
  text-decoration: none;
  visibility: hidden;
  color: #ffffff;
  padding: 10px;
  transition: all 0.2s ease;
}

.account-check:active {
  color: #000;
  transform: translateY(2px);
}

#register.hidden {
  top: calc(5svh + 90px) !important;
  z-index: 1;
}

#login.hidden {
  top: calc(5svh + 220px) !important;
  z-index: 1;
}

.card.hidden {
  background-color: rgba(242, 0, 255, 0.8);
  box-shadow: 0 20px 40px rgb(115, 2, 102);
  padding: 0 30px 0 30px;
}

#register.hidden form {
  transform: translateX(20px);
}

#login.hidden form {
  transform: translateX(-20px);
}

.hidden form {
  opacity: 0;
  transition: all 0.3s ease;
}

.hidden .account-check {
  opacity: 1;
  visibility: visible;
  z-index: 2;
  transition: all 0.2s ease;
}

.register-swap {
  animation: register-swap 0.5s ease forwards;
}

.login-swap {
  animation: login-swap 0.5s ease forwards;
}

.active > label {
  color: rgba(0, 0, 0, 0);
}

@keyframes register-swap {
  0% {
    transform: translate(0%, 0%);
  }
  50% {
    transform: translate(30%, 0%);
  }
  0% {
    transform: translate(0%, 0%);
  }
}

@keyframes login-swap {
  0% {
    transform: translate(0%, 0%);
  }
  50% {
    transform: translate(-70%, 0%);
  }
  0% {
    transform: translate(0%, 0%);
  }
}

@media (max-width: 768px) {
  #phone {
    width: 70%;
    transform: translate(-50%, -70%) scale(1); /* Scale down on small screens */
  }

  #login {
    top: -2svh !important;
  }

  #register {
    top: -2svh !important;
  }

  #register.hidden {
    top: calc(5svh + 90px) !important;
    z-index: 1;
  }

  #login.hidden {
    top: calc(5svh + 90px) !important;
    z-index: 1;
  }
}
</style>
