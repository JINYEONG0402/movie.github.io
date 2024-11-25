<template>
  <div class="container">
    <div id="phone">
      <div id="content-wrapper">
        <!-- Login Form -->
        <div :class="{ card: true, hidden: !isLoginVisible }" id="login">
          <form @submit.prevent="handleLogin">
            <h1>Sign in</h1>
            <div class="input" :class="{ active: isEmailFocused || email }">
              <input
                id="email"
                type="email"
                v-model="email"
                @focus="focusInput('email')"
                @blur="blurInput('email')"
              />
              <label for="email">Username or Email</label>
            </div>
            <div
              class="input"
              :class="{ active: isPasswordFocused || password }"
            >
              <input
                id="password"
                type="password"
                v-model="password"
                @focus="focusInput('password')"
                @blur="blurInput('password')"
              />
              <label for="password">Password</label>
            </div>
            <div class="checkbox remember">
              <input type="checkbox" id="remember" v-model="rememberMe" />
              <label for="remember" class="read-text">Remember me</label>
            </div>
            <div class="checkbox forgot">
              <a href="#">Forgot Password?</a>
            </div>
            <button :disabled="!isLoginFormValid">Login</button>
          </form>
          <a
            href="javascript:void(0)"
            class="account-check"
            @click="toggleCard"
          >
            Don't have an account? <b>Sign up</b>
          </a>
        </div>

        <!-- Register Form -->
        <div :class="{ card: true, hidden: isLoginVisible }" id="register">
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
              :class="{ active: isRegisterPasswordFocused || registerPassword }"
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
            <div
              class="input"
              :class="{ active: isConfirmPasswordFocused || confirmPassword }"
            >
              <input
                id="confirm-password"
                type="password"
                v-model="confirmPassword"
                @focus="focusInput('confirmPassword')"
                @blur="blurInput('confirmPassword')"
              />
              <label for="confirm-password">Confirm Password</label>
            </div>
            <div class="checkbox remember">
              <input type="checkbox" id="terms" v-model="acceptTerms" />
              <label for="terms" class="read-text"
                >I have read <b>Terms and Conditions</b></label
              >
            </div>
            <button :disabled="!isRegisterFormValid">Register</button>
          </form>
          <a
            href="javascript:void(0)"
            class="account-check"
            @click="toggleCard"
          >
            Already have an account? <b>Sign in</b>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    // State variables
    const isLoginVisible = ref(true);
    const email = ref("");
    const password = ref("");
    const registerEmail = ref("");
    const registerPassword = ref("");
    const confirmPassword = ref("");
    const rememberMe = ref(false);
    const acceptTerms = ref(false);
    const isEmailFocused = ref(false);
    const isPasswordFocused = ref(false);
    const isRegisterEmailFocused = ref(false);
    const isRegisterPasswordFocused = ref(false);
    const isConfirmPasswordFocused = ref(false);

    // Computed properties for form validation
    const isLoginFormValid = computed(() => email.value && password.value);
    const isRegisterFormValid = computed(
      () =>
        registerEmail.value &&
        registerPassword.value &&
        confirmPassword.value &&
        registerPassword.value === confirmPassword.value &&
        acceptTerms.value
    );

    // Methods
    const toggleCard = () => {
      isLoginVisible.value = !isLoginVisible.value;
    };

    const focusInput = (inputName: string) => {
      switch (inputName) {
        case "email":
          isEmailFocused.value = true;
          break;
        case "password":
          isPasswordFocused.value = true;
          break;
        case "registerEmail":
          isRegisterEmailFocused.value = true;
          break;
        case "registerPassword":
          isRegisterPasswordFocused.value = true;
          break;
        case "confirmPassword":
          isConfirmPasswordFocused.value = true;
          break;
      }
    };

    const blurInput = (inputName: string) => {
      switch (inputName) {
        case "email":
          isEmailFocused.value = false;
          break;
        case "password":
          isPasswordFocused.value = false;
          break;
        case "registerEmail":
          isRegisterEmailFocused.value = false;
          break;
        case "registerPassword":
          isRegisterPasswordFocused.value = false;
          break;
        case "confirmPassword":
          isConfirmPasswordFocused.value = false;
          break;
      }
    };

    const handleLogin = () => {
      console.log("Login submitted:", {
        email: email.value,
        password: password.value,
      });
      // Perform login logic here
    };

    const handleRegister = () => {
      console.log("Register submitted:", {
        registerEmail: registerEmail.value,
        registerPassword: registerPassword.value,
      });
      // Perform registration logic here
    };

    return {
      isLoginVisible,
      email,
      password,
      registerEmail,
      registerPassword,
      confirmPassword,
      rememberMe,
      acceptTerms,
      isEmailFocused,
      isPasswordFocused,
      isRegisterEmailFocused,
      isRegisterPasswordFocused,
      isConfirmPasswordFocused,
      isLoginFormValid,
      isRegisterFormValid,
      toggleCard,
      focusInput,
      blurInput,
      handleLogin,
      handleRegister,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
