import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '@/modules/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { comparePassword } from '@/shared/utils/auth.util'
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: user.id, username: user.email }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signUp(email: string, password: string) {
    const user = await this.userService.getByEmail(email)

    if (user) {
      throw new BadRequestException('User already exists')
    }

    const newUser = await this.userService.createNewUser({ email, password })

    const payload = { sub: newUser.id, username: newUser.email }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
