// src/mixins/tokenMixin.ts
export const tokenMixin = {
    methods: {
      generateToken(): string {
        return 'token-' + Math.random().toString(36).substr(2) + Date.now().toString(36);
      },
      saveToLocalStorageToken(token: string): void {
        localStorage.setItem('authToken', token);
      }
    }
  };