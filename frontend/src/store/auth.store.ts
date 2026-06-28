import { create } from "zustand";
import type { User, SignInData, SignUpData } from "../types";
import { authService } from "../services/auth.service";
import { socket } from "../services/socket.service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  fetchCredits: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: (() => {
    try {
      const savedUser = localStorage.getItem("pyarelal_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  })(),
  isAuthenticated: !!localStorage.getItem("pyarelal_user") && (
    !!localStorage.getItem("auth_token") || 
    !!localStorage.getItem("authToken") || 
    !!localStorage.getItem("auth_bearer_token") ||
    !!sessionStorage.getItem("auth_token") || 
    !!sessionStorage.getItem("authToken") || 
    !!sessionStorage.getItem("auth_bearer_token")
  ),
  isLoading: false,
  error: null,

  signIn: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.signIn(data);
      if (response.success && response.user) {
        localStorage.setItem("pyarelal_user", JSON.stringify(response.user));
        if (response.token) {
          localStorage.setItem("auth_token", response.token);
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("auth_bearer_token", response.token);
        }
        set({ user: response.user, isAuthenticated: true, error: null });
        // Connect socket when user is logged in
        socket.connect();
      } else {
        throw new Error(response.message || "Failed to authenticate");
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "An authentication error occurred.";
      set({ error: errMsg });
      throw new Error(errMsg);
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.signUp(data);
      if (response.success && response.user) {
        localStorage.setItem("pyarelal_user", JSON.stringify(response.user));
        if (response.token) {
          localStorage.setItem("auth_token", response.token);
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("auth_bearer_token", response.token);
        }
        set({ user: response.user, isAuthenticated: true, error: null });
        // Connect socket when user is logged in
        socket.connect();
      } else {
        throw new Error(response.message || "Failed to register");
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "An account creation error occurred.";
      set({ error: errMsg });
      throw new Error(errMsg);
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await authService.signOut();
    } catch (err) {
      console.error("Logout request error: ", err);
    } finally {
      localStorage.removeItem("pyarelal_user");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("auth_bearer_token");
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("auth_bearer_token");
      set({ user: null, isAuthenticated: false, isLoading: false, error: null });
      socket.disconnect();
    }
  },

  fetchCredits: async () => {
    const { user } = get();
    if (!user) return;
    try {
      const response = await authService.getCredits();
      if (response.success) {
        const updatedUser = { ...user, credits: response.credits };
        localStorage.setItem("pyarelal_user", JSON.stringify(updatedUser));
        set({ user: updatedUser });
      }
    } catch (err) {
      console.error("Credits synchronization error: ", err);
    }
  },

  initialize: async () => {
    // Verify session state by trying to query user credits
    set({ isLoading: true });
    try {
      const response = await authService.getCredits();
      if (response.success && get().user) {
        const updatedUser = { ...get().user!, credits: response.credits };
        localStorage.setItem("pyarelal_user", JSON.stringify(updatedUser));
        set({ user: updatedUser, isAuthenticated: true });
        // Verify socket is connected
        if (!socket.connected) {
          socket.connect();
        }
      } else {
        // Session invalid or expired
        localStorage.removeItem("pyarelal_user");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("authToken");
        localStorage.removeItem("auth_bearer_token");
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("auth_bearer_token");
        set({ user: null, isAuthenticated: false });
        socket.disconnect();
      }
    } catch (err) {
      // If unauthorized, clear frontend auth state
      localStorage.removeItem("pyarelal_user");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("auth_bearer_token");
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("auth_bearer_token");
      set({ user: null, isAuthenticated: false });
      socket.disconnect();
    } finally {
      set({ isLoading: false });
    }
  },
}));
