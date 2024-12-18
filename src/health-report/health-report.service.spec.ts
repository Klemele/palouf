import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { ClientService } from '../client/client.service';
import { PrismaService } from '../prisma/prisma.service';
import { Guidance } from './health-report.dto';
import { HealthReportService } from './health-report.service';

describe('HealthReportService', () => {
  let service: HealthReportService;
  let prismaService: PrismaService;
  let clientInserted: number;
  let healthReportInserted: {
    guidance: string;
    year: number;
    client_id: number;
  }[] = Array(4).fill(0);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthReportService, PrismaService, ClientService],
    }).compile();

    service = module.get<HealthReportService>(HealthReportService);
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
          data: { ...healthReportData, year: index + 2020 },
        });

        return healthReportResult;
      }),
    );
  });
  afterEach(async () => {
    await prismaService.clients.deleteMany({ where: {} });
  });

  describe('healthReport', () => {
    it('should return a health report when found', async () => {
      const healthReport = {
        year: healthReportInserted[0].year,
        client_id: healthReportInserted[0].client_id,
        guidance: Guidance.POSITIVE,
      };
      const result = await service.healthReport({
        year_client_id: {
          year: healthReport.year,
          client_id: healthReport.client_id,
        },
      });

      expect(result).toEqual(healthReport);
    });
    it('should return an error when health report is not found', async () => {
      const result = service.healthReport({
        year_client_id: {
          year: 3000,
          client_id: 190128039,
        },
      });

      expect(result).rejects.toThrow();
    });
  });
  describe('healthReports', () => {
    it('should return list of health reports', async () => {
      const result = await service.healthReports({
        where: { client_id: clientInserted },
      });

      expect(result).toEqual(healthReportInserted);
    });
    it('should return an error when client is not found', async () => {
      const result = service.healthReports({ where: { client_id: 1231 } });

      expect(result).rejects.toThrow();
    });
  });
  describe('createHealthReport', () => {
    it('should create a new health report', async () => {
      const healthReportCommon = {
        year: 2019,
        guidance: Guidance.POSITIVE,
      };
      const healthReportInput = {
        ...healthReportCommon,
        clients: {
          connect: { id: clientInserted },
        },
      };
      const healthReportOutput = {
        ...healthReportCommon,
        client_id: clientInserted,
      };

      const result = await service.createHealthReport(healthReportInput);

      expect(result).toEqual(healthReportOutput);
    });
    it('should return an error when client is not found', async () => {
      const result = service.createHealthReport({
        year: 2023,
        guidance: Guidance.POSITIVE,
        clients: {
          connect: { id: 12834731 },
        },
      });

      expect(result).rejects.toThrow();
    });
  });
  describe('updateHealthReport', () => {
    it('should update an existing health report', async () => {
      const healthReport = healthReportInserted[1];
      const result = await service.updateHealthReport({
        where: {
          year_client_id: {
            year: healthReport.year,
            client_id: healthReport.client_id,
          },
        },
        data: { guidance: Guidance.NEGATIVE },
      });

      expect(result).toMatchObject({
        ...healthReport,
        guidance: Guidance.NEGATIVE,
      });
    });
    it('should return an error when health report is not found', async () => {
      const result = service.updateHealthReport({
        where: {
          year_client_id: {
            year: 2150,
            client_id: clientInserted,
          },
        },
        data: { guidance: Guidance.NEGATIVE },
      });

      expect(result).rejects.toThrow();
    });
    it('should return an error when client is not found', async () => {
      const result = service.updateHealthReport({
        where: {
          year_client_id: {
            year: 2020,
            client_id: 123123,
          },
        },
        data: { guidance: Guidance.NEGATIVE },
      });

      expect(result).rejects.toThrow();
    });
  });
  describe('deleteHealthReport', () => {
    it('should delete a health report', async () => {
      const healthReport = healthReportInserted[2];
      const result = await service.deleteHealthReport({
        year_client_id: {
          year: healthReport.year,
          client_id: healthReport.client_id,
        },
      });

      expect(result).toMatchObject(healthReport);
    });
    it('should return an error when health report is not found', async () => {
      const result = service.deleteHealthReport({
        year_client_id: {
          year: 2150,
          client_id: clientInserted,
        },
      });

      expect(result).rejects.toThrow();
    });
    it('should return an error when client is not found', async () => {
      const result = service.deleteHealthReport({
        year_client_id: {
          year: 2023,
          client_id: 12834731,
        },
      });

      expect(result).rejects.toThrow();
    });
  });
});
