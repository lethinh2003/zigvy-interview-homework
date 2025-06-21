import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, Model } from 'mongoose'
import { TaskStatus } from '../enums/task-status.enum'
import { User } from '@/modules/user/schemas/user.schema'

@Schema({ timestamps: true })
class Task {
  @Prop({ required: true })
  title: string

  @Prop({ required: false })
  description?: string

  @Prop({ required: true, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus

  @Prop({ required: false })
  dueDate?: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User
}

const TaskSchema = SchemaFactory.createForClass(Task)

type TaskDocument = Task & Document

type TaskModel = Model<TaskDocument>

export { TaskSchema, Task }
export type { TaskDocument, TaskModel }
