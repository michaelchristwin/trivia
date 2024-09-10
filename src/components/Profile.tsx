import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  user: {
    email: string;
  } | null;
  isAuthenticated: boolean;
};
type Action = {
  setUser: (userData: State) => void;
  clearUser: () => void;
};

export const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (state) => set({ user: state.user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
    }
  )
);

function Profile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return <div>Authentication is {String(isAuthenticated)}</div>;
}

export default Profile;
