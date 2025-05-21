import axios from "axios";
axios.defaults.withCredentials = true;
import { create } from "zustand";

const API_URL = "http://localhost:4000/api/auth";
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isCheckingAuth: true,

  signup: async (formData) => {
    set({ error: null, isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      set({
        user: response.data.payload,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },
  verifyEmail: async (verificationCode) => {
    set({ error: null, isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        verificationCode,
      });
      set({
        user: response.data.payload,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (formData) => {
    set({ error: null, isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      set({
        user: response.data.payload,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },
  logout: async () => {
    set({ error: null, isLoading: true });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ isLoading: false, isAuthenticated: false, user: null });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.payload,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isCheckingAuth: false,
        isAuthenticated: false,
        user: null,
      });
      throw error;
    }
  },
}));
