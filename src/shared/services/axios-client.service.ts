import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

import { authStore } from "@/modules/auth/stores/auth.store";
import { UserDetails } from "@/modules/user/types/user.type";
import { PathEnum } from "@/shared/enums/path.enum";

import localStorageService from "./local-storage.service";
import { LoginResponse } from "@/modules/auth/types/response.type";

interface HttpClient {
  get<R>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<R>>;
  post<B, R>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>>;
  put<B, R>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>>;
  patch<B, R>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>>;
  delete<R>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>>;
}

class AxiosClient implements HttpClient {
  axiosInstance: AxiosInstance;
  private accessToken: string | null = null;
  private profile: UserDetails | null = null;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.accessToken = authStore.getState().accessToken;
    this.profile = authStore.getState().profile;

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        this.accessToken =
          authStore.getState().accessToken ||
          localStorageService.get("accessToken");

        if (this.accessToken) {
          config.headers["Authorization"] = `Bearer ${this.accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      async (response) => {
        const { url } = response.config;

        if (url === "/login") {
          const result = response.data.data as LoginResponse["data"];
          const { accessToken, user } = result;
          this.handleAuthResponse({ profile: user, accessToken });
        } else if (url === "/logout") {
          authStore.getState().logout();
          toast.success("Logged out successfully");
        }

        return response;
      },
      (error) => {
        const { url } = error.config;

        if (
          error.response.status === HttpStatusCode.Unauthorized &&
          url !== PathEnum.LOGIN
        ) {
          toast.error("Session expired", {
            id: "session_expired",
          });
          authStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );
  }

  private handleAuthResponse(data: {
    profile: UserDetails;
    accessToken: string;
  }) {
    const { profile, accessToken } = data;

    this.profile = profile;
    this.accessToken = accessToken;

    authStore.getState().setAuth({
      profile,
      accessToken,
    });
  }

  private removeEmptyParams(
    params: Record<string, unknown>
  ): Record<string, unknown> {
    return Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, unknown>);
  }

  private async request<R>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    try {
      if (config.params) {
        config.params = this.removeEmptyParams(config.params);
      }
      const response = await this.axiosInstance.request<R>(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Request error:", error);
      }
      throw error;
    }
  }

  get<R>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<R>> {
    return this.request<R>({ ...config, method: "GET", url: endpoint });
  }

  post<B, R>(
    endpoint: string,
    body: B,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<R>> {
    return this.request<R>({
      ...config,
      method: "POST",
      url: endpoint,
      data: body,
    });
  }

  put<B, R>(
    endpoint: string,
    body: B,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<R>> {
    return this.request<R>({
      ...config,
      method: "PUT",
      url: endpoint,
      data: body,
    });
  }

  patch<B, R>(
    endpoint: string,
    body: B,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<R>> {
    return this.request<R>({
      ...config,
      method: "PATCH",
      url: endpoint,
      data: body,
    });
  }

  delete<R>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<R>> {
    return this.request<R>({ ...config, method: "DELETE", url: endpoint });
  }
}

export type { HttpClient };
export default AxiosClient;
