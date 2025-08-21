export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  phone: number;
  countryCode: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface CompanyRegistrationRequest {
  email: string;
  userName: string;
  phone: number;
  countryCode: string;
  companyName: string;
  CompanyType: string;
  companyDescription: string;
  companyWebsite: string;
  companyLocation: string;
  password: string;
  confirmPassword: string;
}
