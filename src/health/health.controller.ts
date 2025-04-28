import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private readonly health: HealthCheckService,
    private readonly mongooseIndicator: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    try {
      const result = await this.health.check([
        () => this.mongooseIndicator.pingCheck('mongodb'),
      ]);

      const isHealthy = result.status === 'ok';

      return {
        status: isHealthy ? 'up' : 'down', // 👈 chuẩn hóa
        info: result.info,
        error: result.error ?? null,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(
        'Health check failed',
        error instanceof Error ? error.stack : String(error),
      );
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      return {
        status: 'down',
        error: errorMessage ?? 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
