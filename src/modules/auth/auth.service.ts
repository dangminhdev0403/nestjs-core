import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'; // nhớ cài: npm install bcryptjs
import { Payload, UserResponseDto } from '../users/dto/users.dto.response';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/service/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUserByEmail(email);
    const isTrue: boolean = await bcrypt.compare(password, user.password);
    if (user && isTrue) {
      return user; // không trả mật khẩu
    }
    return null;
  }

  async validateUserByPayload(email: string): Promise<User> {
    // Chức năng này có thể được sử dụng để xác thực người dùng từ payload JWT
    // Bạn có thể thêm logic tùy chỉnh ở đây nếu cần
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user; // không trả mật khẩu
  }
  login(user: User): object {
    const payload: Payload = {
      name: user.name,
      sub: user.email,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      'access-token': accessToken,
      user: new UserResponseDto(user.name, user.email), // Giả sử bạn đã định nghĩa UserResponseDto
    };
  }
}
