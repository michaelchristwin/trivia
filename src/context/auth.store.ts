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
  if (timestamp === null) {
    console.log("Timestamp is null, considering expired");
    return true; // Consider null as expired or return false based on your logic
  }
  const now = Date.now();
  const expired = now - timestamp > 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  console.log(`Timestamp: ${timestamp}, Now: ${now}, Expired: ${expired}`);
  return expired;
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
          timestamp: Date.now(),
        }),
      clearUser: () => {
        set({ user: null, isAuthenticated: false, timestamp: null });
      },
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
        console.log("Starting rehydration");
        return (restoredState, error) => {
          if (!error && restoredState && isExpired(restoredState?.timestamp)) {
            console.log("State is expired, scheduling clearUser()");
            console.log("Clearing user");
            state.clearUser();
          }
        };
      },
    }
  )
);
export default useAuthStore;
