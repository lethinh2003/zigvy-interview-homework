import { Module } from '@nestjs/common'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'
import { Task, TaskSchema } from './schemas/task.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../user/user.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), UserModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
