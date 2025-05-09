import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,

    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET && 'secret',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN && '1h',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
