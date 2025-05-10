import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './modules/auth/passport/jwt-auth.guard';
import { ResponseInterceptor } from './utils/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global ValidationPipe (Tự động validate DTO, lọc request)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Xóa field không khai báo trong DTO
      forbidNonWhitelisted: true, // Chặn request chứa field lạ
      transform: true, // Tự động chuyển kiểu dữ liệu (string -> number)
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector)); // Đăng ký global guard

  // Enable CORS (nếu cần API gọi từ Frontend khác domain)
  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  app.useGlobalPipes(new ValidationPipe());
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('Ứng dụng không thể khởi động:', error);
  process.exit(1);
});
