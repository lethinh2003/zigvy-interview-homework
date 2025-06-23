import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { UserService } from '@/modules/user/user.service'

@Injectable()
class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const token = this.extractToken(request)

    if (!token) {
      throw new UnauthorizedException('No token provided')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token)

      const user = await this.userService.getById(payload.sub)

      if (!user) {
        throw new NotFoundException('User not found')
      }

      request['user'] = user

      return true
    } catch (error) {
      throw error
    }
  }

  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers['authorization']
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]
    }
    return undefined
  }
}

export { AuthGuard }
