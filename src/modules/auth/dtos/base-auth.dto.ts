import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

class BaseAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Password must contain only letters and numbers' })
  @Length(5, 20)
  password: string
}

export { BaseAuthDto }
