import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dtos/create-task.dto'
import { Authentication } from '../auth/decorators/authentication.decorator'
import { AuthUser } from '../auth/decorators/auth-user.decorator'
import { UserDocument } from '../user/schemas/user.schema'
import { EditTaskDto } from './dtos/edit-task.dto'

@Controller('tasks')
class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks() {
    return await this.taskService.getTasks()
  }

  @Post()
  @Authentication()
  async createTask(@Body() task: CreateTaskDto, @AuthUser() user: UserDocument) {
    return await this.taskService.createTask(task, user)
  }

  @Patch(':id')
  @Authentication()
  async editTask(@Param('id') taskId: string, @Body() task: EditTaskDto, @AuthUser() user: UserDocument) {
    return await this.taskService.editTask(taskId, task, user)
  }

  @Delete(':id')
  @Authentication()
  async deleteTask(@Param('id') taskId: string, @AuthUser() user: UserDocument) {
    return await this.taskService.deleteTask(taskId, user)
  }
}

export { TaskController }
