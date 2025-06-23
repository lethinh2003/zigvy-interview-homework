import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { AuthGuard } from './guards/auth.guard'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard]
})
class AuthModule {}

export { AuthModule }
