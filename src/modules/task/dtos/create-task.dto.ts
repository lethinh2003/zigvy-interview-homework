import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description?: string

  @IsDate()
  @IsOptional()
  dueDate?: Date
}

export { CreateTaskDto }
