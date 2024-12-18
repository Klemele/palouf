import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { health_reports as HealthReportModel } from '@prisma/client';
import {
  CreateHealthReportDto,
  UpdateHealthReportDto,
} from './health-report.dto';
import { HealthReportEntity } from './health-report.entity';
import { HealthReportService } from './health-report.service';

@Controller('health-report')
export class HealthReportController {
  constructor(private readonly healthReportService: HealthReportService) {}

  /**
   * Create a health report
   *
   * @remarks This operation allows you to create a new health report.
   *
   */
  @ApiCreatedResponse({ type: HealthReportEntity })
  @Post()
  async createHealthReport(
    @Body() createHealthReportDto: CreateHealthReportDto,
  ) {
    const { clientId, ...healthReportsData } = createHealthReportDto;
    const data = {
      ...healthReportsData,
      clients: {
        connect: { id: clientId },
      },
    };

    return new HealthReportEntity(
      await this.healthReportService.createHealthReport(data),
    );
  }

  /**
   * Retrieve list of health reports of a healthReport
   *
   * @remarks This operation allows you to retrieve a healthReport health reports.
   *
   * @throws {404} Not found exception if the client or healthReport does not exist.
   */
  @ApiOkResponse({ isArray: true, type: HealthReportEntity })
  @Get(':clientId')
  async listHealthReport(
    @Param('clientId', ParseIntPipe) clientId: number,
  ): Promise<HealthReportModel[]> {
    const healthReports = await this.healthReportService.healthReports({
      where: { client_id: clientId },
    });

    return healthReports.map(
      (healthReport) => new HealthReportEntity(healthReport),
    );
  }

  /**
   * Update a health report
   *
   * @remarks This operation allows you to update a healthReport.
   *
   * @throws {404} Not found exception if the client or healthReport does not exist.
   */
  @ApiOkResponse({ type: HealthReportEntity })
  @Put(':clientId/:year')
  async updateHealthReport(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Param('year', ParseIntPipe) year: number,
    @Body()
    updateHealthReportDto: UpdateHealthReportDto,
  ): Promise<HealthReportModel> {
    return new HealthReportEntity(
      await this.healthReportService.updateHealthReport({
        where: {
          year_client_id: {
            year,
            client_id: clientId,
          },
        },
        data: { ...updateHealthReportDto },
      }),
    );
  }

  /**
   * Delete a health report
   *
   * @remarks This operation allows you to delete a health report.
   *
   * @throws {404} Not found exception if the client or healthReport does not exist.
   */
  @ApiOkResponse({ type: HealthReportEntity })
  @Delete(':clientId/:year')
  async deleteHealthReport(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Param('year', ParseIntPipe) year: number,
  ): Promise<HealthReportModel> {
    return new HealthReportEntity(
      await this.healthReportService.deleteHealthReport({
        year_client_id: { year, client_id: clientId },
      }),
    );
  }
}
