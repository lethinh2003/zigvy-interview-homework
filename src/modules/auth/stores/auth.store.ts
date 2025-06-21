// import Cookies from "js-cookie";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { UserDetails } from "@/modules/user/types/user.type";
import localStorageService from "@/shared/services/local-storage.service";

type AuthState = {
  isAuthenticated: boolean;
  profile: UserDetails | null;
  accessToken: string | null;
  setAuth: (payload: {
    profile?: UserDetails | null;
    accessToken?: string | null;
  }) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  devtools(
    immer((set) => ({
      isAuthenticated: !!localStorageService.get("accessToken"),
      profile: localStorageService.get("profile"),
      accessToken: localStorageService.get("accessToken"),

      setAuth: (payload) =>
        set((state) => {
          state.profile = payload.profile || state.profile;
          state.accessToken = payload.accessToken || state.accessToken;
          state.isAuthenticated = !!state.profile && !!state.accessToken;

          localStorageService.set("accessToken", state.accessToken);
          localStorageService.set("profile", state.profile);
        }),

      logout: () => {
        set((state) => {
          state.isAuthenticated = false;
          state.profile = null;
          state.accessToken = null;
        });

        localStorageService.remove("profile");
        localStorageService.remove("accessToken");

        // Cookies.remove("auth_token");
        // Cookies.remove("redirect_url");
      },
    })),
    { name: "AuthStore" }
  )
);

export { useAuthStore };
export const authStore = useAuthStore;
