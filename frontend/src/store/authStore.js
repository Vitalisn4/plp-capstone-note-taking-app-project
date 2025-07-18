import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (userData) => {
        const { token, ...user } = userData;
        set({ user, token, isAuthenticated: true });
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        delete api.defaults.headers.common["Authorization"];
      },

      setUser: (userData) => {
        const { token, ...user } = userData;
        set({ user, token, isAuthenticated: !!token });
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      },
    }),
    {
      name: "nexus-auth-storage", // A unique name for localStorage
    }
  )
);

const initialState = useAuthStore.getState();
if (initialState.token) {
  initialState.setUser(initialState);
}

export default useAuthStore;
