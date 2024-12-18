import { health_reports as HealthReportModel } from '@prisma/client';

export class HealthReportEntity implements HealthReportModel {
  constructor(partial: Partial<HealthReportEntity>) {
    Object.assign(this, partial);
  }

  /**
   * The health report year
   * @example 2023
   */
  year: number;

  /**
   * The health report client id
   * @example 1
   */
  client_id: number;

  /**
   * The health report guidance
   * @example positive
   */
  guidance: string;
}
