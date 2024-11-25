export class AuthService {
  /**
   * Try to log in a user with the provided email and password.
   * @param email - User's email address
   * @param password - User's password
   * @param saveToken - Whether to save the authentication token
   * @returns A promise that resolves with the user object if login is successful, otherwise rejects with an error.
   */
  tryLogin(email: string, password: string, saveToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user: any) => user.id === email && user.password === password
      );

      if (user) {
        if (saveToken) {
          localStorage.setItem("TMDb-Key", user.password);
        }
        resolve(user); // 로그인 성공
      } else {
        reject(new Error("Login failed")); // 로그인 실패
      }
    });
  }

  /**
   * Register a new user with the provided email and password.
   * @param email - User's email address
   * @param password - User's password
   * @returns A promise that resolves when the user is successfully registered, otherwise rejects with an error.
   */
  tryRegister(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = users.some(
          (existingUser: any) => existingUser.id === email
        );

        if (userExists) {
          throw new Error("User already exists");
        }

        const newUser = { id: email, password: password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        resolve(); // 회원가입 성공
      } catch (err) {
        reject(
          err instanceof Error ? err.message : "An unknown error occurred"
        ); // 회원가입 실패
      }
    });
  }
}

// Export a single instance of AuthService
export const authService = new AuthService();
