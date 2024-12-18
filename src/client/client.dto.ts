import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  /**
   * A client first name
   * @example John
   */
  @IsString()
  @IsNotEmpty()
  first_name: string;

  /**
   * A client last name
   * @example Doe
   */
  @IsString()
  @IsNotEmpty()
  last_name: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
