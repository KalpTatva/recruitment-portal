export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  phone: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}