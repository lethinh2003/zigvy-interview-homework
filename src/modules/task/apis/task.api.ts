import { envConfig } from "@/shared/configs";
import AxiosClient, {
  HttpClient,
} from "@/shared/services/axios-client.service";
import { CreateTaskResponse } from "../types/response.type";
import { CreateTaskBody } from "../types/body.type";

const endpoint = "tasks";

class TaskClient {
  private readonly http: HttpClient;

  constructor() {
    this.http = new AxiosClient(
      `${envConfig.NEXT_PUBLIC_SERVER_URL}/api/v1/${endpoint}`
    );
  }

  async createTask(body: CreateTaskBody) {
    const response = await this.http.post<CreateTaskBody, CreateTaskResponse>(
      "/",
      body
    );
    return response;
  }
}

const taskApi = new TaskClient();
export { taskApi };
