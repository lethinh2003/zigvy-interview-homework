import { User, UserDocument } from '@/modules/user/schemas/user.schema'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

const AuthUser = createParamDecorator<User>((_: unknown, context: ExecutionContext): UserDocument => {
  const request = context.switchToHttp().getRequest()
  return request.user as UserDocument
})

export { AuthUser }
