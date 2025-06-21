import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dtos/sign-in.dto'
import { SignUpDto } from './dtos/sign-up.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password)
  }
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto.email, signUpDto.password)
  }
}
