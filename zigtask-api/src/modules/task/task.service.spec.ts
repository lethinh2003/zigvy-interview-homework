import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Task, TaskDocument } from './schemas/task.schema'
import { UserDocument } from '@/modules/user/schemas/user.schema'
import { CreateTaskDto } from './dtos/create-task.dto'
import { TaskStatus } from './enums/task-status.enum'
import { NotFoundException } from '@nestjs/common'
import { TaskService } from './task.service'

// Mock user object for testing
const mockUser = {
  _id: 'user123',
  email: 'test@example.com',
  password: 'password'
} as UserDocument

// Mock task object
const mockTask = {
  _id: 'task123',
  title: 'Test Task',
  description: 'Test Description',
  status: TaskStatus.TODO,
  user: mockUser._id
}

// Mock constructor function
const MockTaskModelConstructor = jest.fn().mockImplementation((data) => ({
  ...data,
  save: jest.fn().mockResolvedValue({
    _id: 'task123',
    ...data
  })
}))

// Mock Mongoose Model
const mockTaskModel = {
  new: MockTaskModelConstructor,
  create: jest.fn().mockResolvedValue(mockTask),
  find: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([mockTask])
} as any

describe('TaskService', () => {
  let service: TaskService
  let model: Model<TaskDocument>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel
        }
      ]
    }).compile()

    service = module.get<TaskService>(TaskService)
    model = module.get<Model<TaskDocument>>(getModelToken(Task.name))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
