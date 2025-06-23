import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { TaskStatus } from '../enums/task-status.enum'
import { ApiProperty } from '@nestjs/swagger'

class EditTaskDto {
  @ApiProperty({
    example: 'Task 1',
    description: 'The title of the Task',
    required: false
  })
  @IsString()
  @IsOptional()
  title?: string

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
    description: 'The due date of the Task, format: YYYY-MM-DD',
    required: false
  })
  @IsDate()
  @IsOptional()
  dueDate?: Date

  @ApiProperty({
    example: TaskStatus.TODO,
    description: 'The status of the Task',
    required: false,
    default: TaskStatus.TODO
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus

  @ApiProperty({
    example: 1,
    description: 'The priority of the Task',
    required: false,
    default: 1
  })
  @IsNumber()
  @IsOptional()
  priority?: number
}

export { EditTaskDto }
