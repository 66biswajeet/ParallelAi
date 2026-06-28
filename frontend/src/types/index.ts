export interface User {
  id: string;
  email: string;
  name?: string;
  credits: number;
}

export interface SignUpData {
  email: string;
  password?: string;
  name?: string;
}

export interface SignInData {
  email: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user: User;
  token?: string;
}

export interface CreditsResponse {
  success: boolean;
  credits: number;
}

export interface Project {
  id: string;
  name: string;
  initialPrompt: string;
  currentCode: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  project: Project;
}
