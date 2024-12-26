import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isTMDbAuthenticated = localStorage.getItem("TMDb-Key") !== null;
  const isKakaoAuthenticated = localStorage.getItem("Kakao-Token") !== null;

  if (isTMDbAuthenticated || isKakaoAuthenticated) {
    next(); // 인증됨: 라우터 이동 허용
  } else {
    next("/signIn"); // 인증되지 않음: 로그인 페이지로 리디렉션
  }
};
