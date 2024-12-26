export class AuthService {
  static isLoggedIn(): boolean {
    return !!localStorage.getItem("Kakao-Token");
  }

  static getToken(): string | null {
    return localStorage.getItem("Kakao-Token");
  }

  static logout(): void {
    localStorage.removeItem("Kakao-Token");
  }
}
