import { applyDecorators, UseGuards } from '@nestjs/common'

import { AuthGuard } from '@/modules/auth/guards/auth.guard'

function Authentication() {
  return applyDecorators(UseGuards(AuthGuard))
}

export { Authentication }
