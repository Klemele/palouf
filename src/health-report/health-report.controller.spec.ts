import { Test, TestingModule } from '@nestjs/testing';
import { ClientModule } from '../client/client.module';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthReportController } from './health-report.controller';
import { HealthReportService } from './health-report.service';

describe('HealthReportController', () => {
  let controller: HealthReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthReportController],
      providers: [HealthReportService],
      imports: [PrismaModule, ClientModule],
    }).compile();

    controller = module.get<HealthReportController>(HealthReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
