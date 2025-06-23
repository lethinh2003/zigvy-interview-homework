import { deleteCookie, setCookie } from "cookies-next/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { UserDetails } from "@/modules/user/types/user.type";
import localStorageService from "@/shared/services/local-storage.service";
import { envConfig } from "@/shared/configs";
import { parseTimeString } from "@/shared/utils";
import { PathEnum } from "@/shared/enums";

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
          setCookie("accessToken", state.accessToken, {
            expires: new Date(
              Date.now() + parseTimeString(envConfig.NEXT_PUBLIC_JWT_EXPIRED_IN)
            ),
            path: "/",
            sameSite: "strict",
          });
        }),

      logout: () => {
        set((state) => {
          state.isAuthenticated = false;
          state.profile = null;
          state.accessToken = null;
        });

        localStorageService.remove("profile");
        localStorageService.remove("accessToken");
        deleteCookie("accessToken", {
          path: "/",
        });
        window.location.href = PathEnum.LOGIN;
      },
    })),
    { name: "AuthStore" }
  )
);

export { useAuthStore };
export const authStore = useAuthStore;
