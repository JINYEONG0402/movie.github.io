import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAuthenticated = localStorage.getItem("TMDb-Key") !== null;

  if (isAuthenticated) {
    next(); // 인증됨: 라우터 이동 허용
  } else {
    next("/signIn"); // 인증되지 않음: 로그인 페이지로 리디렉션
  }
};
