import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, health_reports } from '@prisma/client';
import { ClientService } from '../client/client.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthReportService {
  constructor(
    private prisma: PrismaService,
    private readonly clientService: ClientService,
  ) {}

  async healthReport(
    healthReportsWhereUniqueInput: Prisma.health_reportsWhereUniqueInput,
  ): Promise<health_reports | null> {
    const health_report = await this.prisma.health_reports.findUnique({
      where: healthReportsWhereUniqueInput,
    });

    if (!health_report) {
      throw new NotFoundException(
        `health report with ${healthReportsWhereUniqueInput.year_client_id.client_id}  - ${healthReportsWhereUniqueInput.year_client_id.year} does not exist.`,
      );
    }

    return health_report;
  }

  async healthReports(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.health_reportsWhereUniqueInput;
    where?: Prisma.health_reportsWhereInput;
    orderBy?: Prisma.health_reportsOrderByWithRelationInput;
  }): Promise<health_reports[]> {
    const { skip, take, cursor, where, orderBy } = params;
    // Ensure client exists
    await this.clientService.client({ id: where.client_id as number });

    return this.prisma.health_reports.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createHealthReport(
    data: Prisma.health_reportsCreateInput,
  ): Promise<health_reports> {
    // Ensure client exists
    await this.clientService.client({ id: data.clients.connect.id });

    return this.prisma.health_reports.create({
      data,
    });
  }

  async updateHealthReport(params: {
    where: Prisma.health_reportsWhereUniqueInput;
    data: Prisma.health_reportsUpdateInput;
  }): Promise<health_reports> {
    const { where, data } = params;

    // Ensure client exists
    await this.clientService.client({ id: where.year_client_id.client_id });

    // Ensure healthReport exists
    await this.healthReport(where);

    return this.prisma.health_reports.update({
      data,
      where,
    });
  }

  async deleteHealthReport(
    where: Prisma.health_reportsWhereUniqueInput,
  ): Promise<health_reports> {
    // Ensure client exists
    await this.clientService.client({ id: where.year_client_id.client_id });

    // Ensure healthReport exists
    await this.healthReport(where);

    return this.prisma.health_reports.delete({
      where,
    });
  }
}
