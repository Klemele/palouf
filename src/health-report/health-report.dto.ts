import { OmitType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum Guidance {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}
export class CreateHealthReportDto {
  /**
   * The health report year
   * @example 2020
   */
  @IsNumber()
  @IsNotEmpty()
  year: number;

  /**
   * The health report guidance
   * @example positive
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(Guidance)
  guidance: Guidance;

  /**
   * The health report client id
   * @example 1
   */
  @IsNumber()
  @IsNotEmpty()
  clientId: number;
}

export class UpdateHealthReportDto extends OmitType(CreateHealthReportDto, [
  'clientId',
  'year',
]) {}
