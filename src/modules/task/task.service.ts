import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskModel } from './schemas/task.schema'
import { InjectModel } from '@nestjs/mongoose'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UserDocument } from '../user/schemas/user.schema'
import { EditTaskDto } from './dtos/edit-task.dto'

@Injectable()
class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: TaskModel) {}

  async createTask(task: CreateTaskDto, user: UserDocument) {
    return await this.taskModel.create({ ...task, user: user._id })
  }

  async editTask(taskId: string, task: EditTaskDto, user: UserDocument) {
    const updatedTask = await this.taskModel.findOneAndUpdate({ _id: taskId, user: user._id }, task, { new: true })
    if (!updatedTask) {
      throw new NotFoundException('Task not found')
    }
    return updatedTask
  }

  async getTasks() {
    return await this.taskModel.find().populate('user')
  }

  async deleteTask(taskId: string, user: UserDocument) {
    const deletedTask = await this.taskModel.findOneAndDelete({ _id: taskId, user: user._id })
    if (!deletedTask) {
      throw new NotFoundException('Task not found')
    }
    return deletedTask
  }
}

export { TaskService }
