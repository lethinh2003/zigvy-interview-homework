import { Injectable, Logger } from '@nestjs/common'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async getList() {
    return await this.userModel.find()
  }

  async getById(id: string) {
    return await this.userModel.findById(id)
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }

  async createNewUser({ email, password }: { email: string; password: string }) {
    return await this.userModel.create({ email, password })
  }
}

export { UserService }
