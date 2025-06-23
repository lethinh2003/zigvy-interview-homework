import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

class BaseAuthDto {
  @ApiProperty({
    example: 'lethinh@gmail.com',
    description: 'The email of the User',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'password123',
    description: 'The password of the User',
    required: true,
    minLength: 5,
    maxLength: 20,
    format: 'password'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Password must contain only letters and numbers' })
  @Length(5, 20)
  password: string
}

export { BaseAuthDto }
