import { envConfig } from "@/shared/configs";
import AxiosClient, {
  HttpClient,
} from "@/shared/services/axios-client.service";
import {
  CreateTaskResponse,
  DeleteTaskResponse,
  GetTasksResponse,
  UpdateTaskResponse,
} from "../types/response.type";
import { CreateTaskBody, UpdateTaskBody } from "../types/body.type";
import { GetTasksParam } from "../types/param.type";

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

  async updateTask(id: string, body: UpdateTaskBody) {
    const response = await this.http.patch<UpdateTaskBody, UpdateTaskResponse>(
      `/${id}`,
      body
    );
    return response;
  }

  async getTasks(params: GetTasksParam) {
    const response = await this.http.get<GetTasksResponse>("/", { params });
    return response;
  }

  async deleteTask(id: string) {
    const response = await this.http.delete<DeleteTaskResponse>(`/${id}`);
    return response;
  }
}

const taskApi = new TaskClient();
export { taskApi };
