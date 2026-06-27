import { api } from "./api";
import type { SignUpData, SignInData, AuthResponse, CreditsResponse } from "../types";

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/sign-up", data);
    return response.data;
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/sign-in", data);
    return response.data;
  },

  async signOut(): Promise<{ success: boolean; message: string }> {
    const response = await api.post<{ success: boolean; message: string }>("/api/auth/sign-out");
    return response.data;
  },

  async getCredits(): Promise<CreditsResponse> {
    const response = await api.get<CreditsResponse>("/api/user/credits");
    return response.data;
  },
};
