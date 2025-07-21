import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // This function correctly receives user data from the API on login.
      login: (userData) => {
        const { token, ...user } = userData;
        set({ user, token, isAuthenticated: true });
        // Set the default header for all subsequent API calls
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },

      // This function correctly clears the state on logout.
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // Remove the default header
        delete api.defaults.headers.common["Authorization"];
      },
    }),
    {
      name: "nexus-auth-storage", // The name of the item in localStorage
    }
  )
);

// --- FIX: REMOVE THE MANUAL REHYDRATION LOGIC ---
// The `persist` middleware handles this automatically. The code below was
// causing the state corruption on page refresh. By removing it, we let
// Zustand handle the state correctly.

// const initialState = useAuthStore.getState();
// if (initialState.token) {
//   // This logic was incorrect. The `setUser` function was also redundant.
//   initialState.setUser(initialState);
// }

// --- We also need to set the initial auth header on app load ---
// If a token exists from the persisted state, set the default axios header.
const initialToken = useAuthStore.getState().token;
if (initialToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
}

export default useAuthStore;
