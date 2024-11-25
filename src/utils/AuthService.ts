export interface User {
  id: string;
  password: string;
}

export class AuthService {
  tryLogin(email: string, password: string, saveToken = true): Promise<User> {
    return new Promise((resolve, reject) => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user) => user.id === email && user.password === password
      );

      if (user) {
        if (saveToken) {
          localStorage.setItem("TMDb-Key", user.password);
        }
        resolve(user);
      } else {
        reject(new Error("Login failed"));
      }
    });
  }

  tryRegister(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = users.some(
          (existingUser) => existingUser.id === email
        );

        if (userExists) {
          throw new Error("User already exists");
        }

        const newUser: User = { id: email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        resolve();
      } catch (err) {
        reject(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    });
  }
}

// Export a single instance of AuthService
export const authService = new AuthService();
