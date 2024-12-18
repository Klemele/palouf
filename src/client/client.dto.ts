import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  /**
   * A client first name
   * @example John
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  /**
   * A client first name
   * @example Doe
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  last_name: string;
}

export class UpdateClientsto extends PartialType(CreateClientDto) {}
