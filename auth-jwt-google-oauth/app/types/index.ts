export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: Omit<User, 'password'>;
    accessToken: string;
    refreshToken?: string;
  };
  error?: string;
}

export interface WebhookPayload {
  event: string;
  userId: string;
  timestamp: Date;
  data: Record<string, any>;
}
