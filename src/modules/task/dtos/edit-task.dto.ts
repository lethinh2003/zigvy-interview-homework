import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { TaskStatus } from '../enums/task-status.enum'

class EditTaskDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsDate()
  @IsOptional()
  dueDate?: Date

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus

  @IsNumber()
  @IsOptional()
  priority?: number
}

export { EditTaskDto }
