import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskDocument, TaskModel } from './schemas/task.schema'
import { InjectModel } from '@nestjs/mongoose'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UserDocument } from '../user/schemas/user.schema'
import { EditTaskDto } from './dtos/edit-task.dto'
import { FilterQuery } from 'mongoose'
import { TaskStatus } from './enums/task-status.enum'

@Injectable()
class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: TaskModel) {}

  async createTask(task: CreateTaskDto, user: UserDocument) {
    // Count the number of tasks with the same priority
    const priorityCount = await this.taskModel.countDocuments({
      status: task.status,
      user: user._id
    })
    task.priority = priorityCount + 1
    return await this.taskModel.create({ ...task, user: user._id })
  }

  async editTask(taskId: string, task: EditTaskDto, user: UserDocument) {
    const updatedTask = await this.taskModel.findOneAndUpdate({ _id: taskId, user: user._id }, task, { new: true })
    if (!updatedTask) {
      throw new NotFoundException('Task not found')
    }
    return updatedTask
  }

  async getTasks({
    title,
    dueDate,
    status,
    user
  }: {
    title?: string
    dueDate?: string
    status?: TaskStatus
    user?: string
  }) {
    const query: FilterQuery<TaskDocument> = {}
    if (title) {
      query.title = { $regex: title, $options: 'i' }
    }
    if (dueDate) {
      query.dueDate = { $eq: new Date(dueDate) }
    }
    if (status) {
      query.status = { $eq: status }
    }
    if (user) {
      query.user = user
    }
    return await this.taskModel.find(query).sort({ status: 1, priority: 1 }).populate('user')
  }

  async getTask(taskId: string, user?: string): Promise<TaskDocument | null> {
    const query: FilterQuery<TaskDocument> = { _id: taskId }
    if (user) {
      query.user = user
    }
    return await this.taskModel.findOne(query)
  }

  async deleteTask(taskId: string, user: UserDocument) {
    // Get the task before deletion to know its status and priority
    const taskToDelete = await this.taskModel.findOne({ _id: taskId, user: user._id })
    if (!taskToDelete) {
      throw new NotFoundException('Task not found')
    }

    // Delete the task
    const deletedTask = await this.taskModel.findOneAndDelete({ _id: taskId, user: user._id })

    // Reorder priorities of remaining tasks in the same status
    const remainingTasks = await this.taskModel
      .find({
        status: taskToDelete.status,
        user: user._id,
        priority: { $gt: taskToDelete.priority }
      })
      .sort({ priority: 1 })

    // Decrease priority of tasks that had higher priority than the deleted task
    for (const task of remainingTasks) {
      await this.taskModel.updateOne({ _id: task._id }, { priority: task.priority - 1 })
    }

    return deletedTask
  }
}

export { TaskService }
