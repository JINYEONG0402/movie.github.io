import axios from "axios";

// 사용자 타입 정의
interface User {
  id: string;
  password: string;
  apiKey: string;
}

export class AuthService {
  /**
   * 사용자 로그인
   */
  tryLogin(email: string, apiKey: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user) => user.id === email && user.apiKey === apiKey // API Key로 인증
      );

      if (user) {
        resolve(user); // 로그인 성공
      } else {
        reject(new Error("Login failed. Please check your email or API key."));
      }
    });
  }

  /**
   * 사용자 회원가입
   */
  tryRegister(email: string, password: string, apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        const userExists = users.some(
          (existingUser) => existingUser.id === email
        );

        if (userExists) {
          return reject(new Error("User already exists"));
        }

        const newUser: User = { id: email, password: password, apiKey: apiKey };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        resolve();
      } catch (err) {
        return reject(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    });
  }

  /**
   * TMDB API Key 유효성 검사
   */
  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      return response.status === 200;
    } catch (error) {
      console.error("API Key validation failed:", error);
      return false;
    }
  }
}

export const authService = new AuthService();
