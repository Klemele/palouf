import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { ClientModule } from '../client/client.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { HealthReportController } from './health-report.controller';
import { Guidance } from './health-report.dto';
import { HealthReportService } from './health-report.service';

describe('HealthReportController', () => {
  let controller: HealthReportController;
  let prismaService: PrismaService;
  let clientInserted: number;
  let healthReportInserted: {
    guidance: string;
    year: number;
    client_id: number;
  }[] = Array(4).fill(0);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthReportController],
      providers: [HealthReportService],
      imports: [PrismaModule, ClientModule],
    }).compile();

    controller = module.get<HealthReportController>(HealthReportController);
    prismaService = module.get<PrismaService>(PrismaService);

    const clientData: Prisma.clientsCreateInput = {
      first_name: 'Henry',
      last_name: 'Bond',
    };
    const clientResult = await prismaService.clients.create({
      data: clientData,
    });
    clientInserted = clientResult.id;

    const healthReportData: Prisma.health_reportsCreateInput = {
      year: 0,
      guidance: Guidance.POSITIVE,
      clients: {
        connect: { id: clientInserted },
      },
    };
    healthReportInserted = await Promise.all(
      healthReportInserted.map(async (_, index) => {
        const healthReportResult = await prismaService.health_reports.create({
          data: { ...healthReportData, year: index + 2030 },
        });

        return healthReportResult;
      }),
    );
  });
  afterEach(async () => {
    await prismaService.clients.deleteMany({ where: { id: clientInserted } });
    await prismaService.health_reports.deleteMany({
      where: { client_id: clientInserted },
    });
  });

  describe('createHealthReport', () => {
    it('should create a new health report', async () => {
      const healthReportCommon = {
        year: 2018,
        guidance: Guidance.NEGATIVE,
      };
      const healthReportInput = {
        ...healthReportCommon,
        clientId: clientInserted,
      };
      const healthReportOutput = {
        ...healthReportCommon,
        client_id: clientInserted,
      };

      const result = await controller.createHealthReport(healthReportInput);

      expect(result).toEqual(healthReportOutput);
    });
    it('should throw an error when client is not found', async () => {
      const result = controller.createHealthReport({
        year: 2023,
        guidance: Guidance.NEGATIVE,
        clientId: 12834731,
      });

      expect(result).rejects.toThrow();
    });
  });
  describe('listHealthReport', () => {
    it('should return list of health reports', async () => {
      const result = await controller.listHealthReport(clientInserted);

      expect(result).toEqual(healthReportInserted);
    });
    it('should throw an error when client is not found', async () => {
      const result = controller.listHealthReport(12331);

      expect(result).rejects.toThrow();
    });
  });
  describe('updateHealthReport', () => {
    it('should update an existing health report', async () => {
      const healthReport = healthReportInserted[1];
      const result = await controller.updateHealthReport(
        healthReport.client_id,
        healthReport.year,
        {
          guidance: Guidance.NEGATIVE,
        },
      );

      expect(result).toMatchObject({
        ...healthReport,
        guidance: Guidance.NEGATIVE,
      });
    });
    it('should throw an error when health report is not found', async () => {
      const result = controller.updateHealthReport(2150, clientInserted, {
        guidance: Guidance.NEGATIVE,
      });

      expect(result).rejects.toThrow();
    });
    it('should throw an error when client is not found', async () => {
      const result = controller.updateHealthReport(2020, 123123, {
        guidance: Guidance.NEGATIVE,
      });

      expect(result).rejects.toThrow();
    });
  });
  describe('deleteHealthReport', () => {
    it('should delete a health report', async () => {
      const healthReport = healthReportInserted[2];
      const result = await controller.deleteHealthReport(
        healthReport.client_id,
        healthReport.year,
      );

      expect(result).toMatchObject(healthReport);
    });
    it('should throw an error when health report is not found', async () => {
      const result = controller.deleteHealthReport(2150, clientInserted);

      expect(result).rejects.toThrow();
    });
    it('should throw an error when client is not found', async () => {
      const result = controller.deleteHealthReport(2023, 12834731);

      expect(result).rejects.toThrow();
    });
  });
});
