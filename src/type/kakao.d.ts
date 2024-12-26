interface KakaoAuth {
  login(params?: any): void;
  logout(): void;
  getAccessToken(): string | null;
  authorize(params: { redirectUri: string }): void;
}

interface Kakao {
  Auth: KakaoAuth;
  init(apiKey: string): void;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export {};
