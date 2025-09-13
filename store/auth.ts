import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase"; // your supabase client

interface AuthState {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null, session: Session | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setUser: (user, session) => set({ user, session }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));