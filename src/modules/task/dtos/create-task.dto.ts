import { Transform } from 'class-transformer'
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { TaskStatus } from '../enums/task-status.enum'
import { ApiProperty } from '@nestjs/swagger'

class CreateTaskDto {
  @ApiProperty({
    example: 'Task 1',
    description: 'The title of the Task',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    example: 'This is a task description',
    description: 'The description of the Task',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    example: '2025-01-01',
    description: 'The due date of the Task, format: ',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date

  @ApiProperty({
    example: TaskStatus.TODO,
    enum: TaskStatus,
    description: 'The status of the Task',
    required: false,
    default: TaskStatus.TODO
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  @Transform(({ value }) => value || TaskStatus.TODO)
  status?: TaskStatus

  @ApiProperty({
    example: 1,
    description: 'The priority of the Task',
    required: false,
    default: 1
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value || 1)
  priority?: number
}

export { CreateTaskDto }
