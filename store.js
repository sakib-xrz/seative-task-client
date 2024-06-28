import { create } from "zustand";
import ApiKit from "./common/ApiKit";
import HttpKit from "./common/HttpKit";
import { AUTH_TOKEN_KEY } from "./lib/keyChain";

const useStore = create((set) => ({
  user: null,
  userLoading: false,

  fetchUser: async () => {
    set({ userLoading: true });
    const { data } = await ApiKit.user.getMe();
    set({ user: data?.user });
    set({ userLoading: false });
  },

  logOut: async () => {
    set({ user: null });
    localStorage.removeItem(AUTH_TOKEN_KEY);
    await HttpKit.removeClientToken();
  },
}));

export default useStore;
