import { Transform } from 'class-transformer'
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { TaskStatus } from '../enums/task-status.enum'

class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description?: string

  @IsDateString()
  @IsOptional()
  dueDate?: Date

  @IsEnum(TaskStatus)
  @IsOptional()
  @Transform(({ value }) => value || TaskStatus.TODO)
  status?: TaskStatus

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value || 0)
  priority?: number
}

export { CreateTaskDto }
