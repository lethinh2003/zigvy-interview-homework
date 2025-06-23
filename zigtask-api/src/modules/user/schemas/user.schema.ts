import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'
import { hashPassword } from '@/shared/utils/auth.util'

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
class User {
  @Prop({ required: true, unique: true, index: true })
  email: string

  @Prop({ required: true })
  password: string

  // Add this later for the relationship
  // @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Task' })
  // tasks: Task[];
}

const UserSchema = SchemaFactory.createForClass(User)

// This is crucial for hiding the password by default when we return user objects
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.__v
  return userObject
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await hashPassword(this.password)
  next()
})

type UserDocument = User & Document

type UserModel = Model<UserDocument>

export { UserSchema, User }
export type { UserDocument, UserModel }
