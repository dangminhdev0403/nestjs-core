import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersController } from './modules/users/controller/users.controller';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, TerminusModule, HttpModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('MONGO_URI is not defined in environment variables');
        }

        const mongoose = (await import('mongoose')).default;

        mongoose.connection.on('connected', () => {
          Logger.log('✅ MongoDB connected successfully', 'MongoDB');
        });

        mongoose.connection.on('error', (error) => {
          Logger.error(`❌ MongoDB connection error: ${error}`, '', 'MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
          Logger.warn('⚠️ MongoDB disconnected', 'MongoDB');
        });

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    TerminusModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [
    UsersController,
    HealthController,
    AppController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
