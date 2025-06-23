import { Controller, Get, Query } from '@nestjs/common'

import { UserService } from './user.service'
import { Authentication } from '../auth/decorators/authentication.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
