import { create } from "zustand";

export type User = {
  id: number,
  name: string,
  email: string,
  password: string,
  city: string
}

type UserStore = {
  user: User | null,
  login: (value: User) => void,
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: (() => {
    const currentUser = localStorage.getItem("currentUser");

    return currentUser ? JSON.parse(currentUser) : null;
  })(),

  login: (userData) => {
    set({
      user: userData
    });
    localStorage.setItem("currentUser", JSON.stringify(userData));
  },

  logout: () => {
    set({
      user: null
    });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
  },

}));