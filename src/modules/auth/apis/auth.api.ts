import envConfig from "@/shared/configs/env.config";
import AxiosClient, {
  HttpClient,
} from "@/shared/services/axios-client.service";
import { LoginBody } from "../types/body.type";
import { LoginResponse } from "../types/response.type";

const endpoint = "auth";

class AuthClient {
  private readonly http: HttpClient;

  constructor() {
    this.http = new AxiosClient(
      `${envConfig.NEXT_PUBLIC_SERVER_URL}/api/v1/${endpoint}`
    );
  }

  async login(body: LoginBody) {
    const response = await this.http.post<LoginBody, LoginResponse>(
      "/sign-in",
      body
    );
    return response;
  }
}

const authApi = new AuthClient();
export { authApi };
