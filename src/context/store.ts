import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  email: string;
} | null;

interface StoreState {
  user: User;
  isAuthenticated: boolean;
  timestamp: number | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
  checkExpiry: () => void;
}

const isExpired = (timestamp: number | null): boolean => {
  if (timestamp === null) return true; // Consider null as expired<State & Actions> or return false based on your logic
  const now = new Date().getTime();
  return now - timestamp > 24 * 60 * 60 * 1000; // 24 hours in milliseconds
};

const useAuthStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      timestamp: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user: user,
          isAuthenticated: true,
          timestamp: new Date().getTime(),
        }),
      clearUser: () =>
        set({ user: null, isAuthenticated: false, timestamp: null }),

      checkExpiry: () => {
        const { timestamp } = get();
        if (isExpired(timestamp)) {
          set({ user: null, isAuthenticated: false, timestamp: null });
        }
      },
    }),
    {
      name: "user-storage",
      onRehydrateStorage(state) {
        if (state && isExpired(state.timestamp)) {
          state.clearUser();
        }
      },
    }
  )
);
export default useAuthStore;
