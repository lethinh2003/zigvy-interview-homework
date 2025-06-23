import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, NotFoundException } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dtos/create-task.dto'
import { Authentication } from '../auth/decorators/authentication.decorator'
import { AuthUser } from '../auth/decorators/auth-user.decorator'
import { UserDocument } from '../user/schemas/user.schema'
import { EditTaskDto } from './dtos/edit-task.dto'
import { TaskStatus } from './enums/task-status.enum'
import { TaskDocument } from './schemas/task.schema'

@Controller('tasks')
class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Authentication()
  async getTasks(
    @Query('title') title: string,
    @Query('dueDate') dueDate: string,
    @Query('status') status: TaskStatus,
    @AuthUser() user: UserDocument
  ) {
    return await this.taskService.getTasks({ title, dueDate, status, user: user._id.toString() })
  }

  @Post()
  @Authentication()
  async createTask(@Body() task: CreateTaskDto, @AuthUser() user: UserDocument) {
    return await this.taskService.createTask(task, user)
  }

  @Patch(':id')
  @Authentication()
  async editTask(@Param('id') taskId: string, @Body() taskUpdate: EditTaskDto, @AuthUser() user: UserDocument) {
    // Get the current task and verify ownership
    const currentTask = await this.taskService.getTask(taskId, user._id.toString())
    if (!currentTask) {
      throw new NotFoundException('Task not found or access denied')
    }

    // If status is being changed, handle status transition first
    if (taskUpdate.status && taskUpdate.status !== currentTask.status) {
      await this.handleStatusChange(currentTask, taskUpdate, user)
    }
    // If priority is being updated within the same status, handle priority reordering
    else if (
      taskUpdate.priority !== undefined &&
      taskUpdate.priority !== currentTask.priority &&
      (!taskUpdate.status || taskUpdate.status === currentTask.status)
    ) {
      await this.handlePriorityUpdate(currentTask, taskUpdate, user)
    }

    // Finally update the target task
    return await this.taskService.editTask(taskId, taskUpdate, user)
  }

  private async handlePriorityUpdate(currentTask: TaskDocument, taskUpdate: EditTaskDto, user: UserDocument) {
    const tasksInSameStatus = await this.taskService.getTasks({
      status: currentTask.status,
      user: user._id.toString()
    })

    const currentPriority = currentTask.priority
    const newPriority = taskUpdate.priority!

    // Validate priority range
    if (newPriority < 1 || newPriority > tasksInSameStatus.length) {
      throw new NotFoundException(`Priority must be between 1 and ${tasksInSameStatus.length}`)
    }

    // If moving to a higher priority (lower number)
    if (newPriority < currentPriority) {
      // Increase priority of tasks between new and current priority
      for (const task of tasksInSameStatus) {
        if (
          task._id.toString() !== currentTask._id.toString() &&
          task.priority >= newPriority &&
          task.priority < currentPriority
        ) {
          await this.taskService.editTask(task._id.toString(), { priority: task.priority + 1 }, user)
        }
      }
    }
    // If moving to a lower priority (higher number)
    else if (newPriority > currentPriority) {
      // Decrease priority of tasks between current and new priority
      for (const task of tasksInSameStatus) {
        if (
          task._id.toString() !== currentTask._id.toString() &&
          task.priority > currentPriority &&
          task.priority <= newPriority
        ) {
          await this.taskService.editTask(task._id.toString(), { priority: task.priority - 1 }, user)
        }
      }
    }
  }

  private async handleStatusChange(currentTask: TaskDocument, taskUpdate: EditTaskDto, user: UserDocument) {
    const oldStatus = currentTask.status
    const newStatus = taskUpdate.status!

    console.log(oldStatus, newStatus)

    // Remove task from old status by shifting priorities
    const oldStatusTasks = await this.taskService.getTasks({
      status: oldStatus,
      user: user._id.toString()
    })

    for (const task of oldStatusTasks) {
      if (task._id.toString() !== currentTask._id.toString() && task.priority > currentTask.priority) {
        await this.taskService.editTask(task._id.toString(), { priority: task.priority - 1 }, user)
      }
    }

    // Get tasks in the new status
    const newStatusTasks = await this.taskService.getTasks({
      status: newStatus,
      user: user._id.toString()
    })

    // Determine the target priority
    let targetPriority: number
    if (taskUpdate.priority !== undefined) {
      // User specified a priority
      targetPriority = taskUpdate.priority

      // Validate priority range
      if (targetPriority < 1 || targetPriority > newStatusTasks.length + 1) {
        throw new NotFoundException(`Priority must be between 1 and ${newStatusTasks.length + 1}`)
      }

      // Shift priorities of existing tasks to make room
      for (const task of newStatusTasks) {
        if (task.priority >= targetPriority) {
          await this.taskService.editTask(task._id.toString(), { priority: task.priority + 1 }, user)
        }
      }
    } else {
      // No priority specified, add to the end
      targetPriority = newStatusTasks.length + 1
    }

    taskUpdate.priority = targetPriority
  }

  @Delete(':id')
  @Authentication()
  async deleteTask(@Param('id') taskId: string, @AuthUser() user: UserDocument) {
    return await this.taskService.deleteTask(taskId, user)
  }
}

export { TaskController }
