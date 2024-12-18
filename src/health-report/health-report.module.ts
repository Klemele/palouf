import { Module } from '@nestjs/common';
import { ClientModule } from '../client/client.module';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthReportController } from './health-report.controller';
import { HealthReportService } from './health-report.service';

@Module({
  controllers: [HealthReportController],
  providers: [HealthReportService],
  imports: [PrismaModule, ClientModule],
})
export class HealthReportModule {}
