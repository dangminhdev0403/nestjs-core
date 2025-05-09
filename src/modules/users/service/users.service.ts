import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs'; // nhớ cài: npm install bcryptjs
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from '../dto/users.dto.request';
import { UserResponseDto } from '../dto/users.dto.response';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email } = createUserDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      throw new ConflictException('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass: string = await bcrypt.hash(createUserDto.password, salt);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPass,
    });
    await createdUser.save();
    const res: UserResponseDto = new UserResponseDto(
      createdUser.name,
      createdUser.email,
    );
    return res;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Id không hợp lệ');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
