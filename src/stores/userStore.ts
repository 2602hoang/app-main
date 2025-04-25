// stores/useUserStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "./type";

interface UserStore {
  user: User | null;
  timeInit: string;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      timeInit: "",
      setUser: (user) =>
        set({
          user,
          timeInit: new Date().toISOString(),
        }),
    }),
    {
      name: process.env.NEXT_PUBLIC_APP1_INIT_KEY ?? "user-store",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
      skipHydration: true,
    }
  )
);
