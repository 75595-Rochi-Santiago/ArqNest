import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetEstablishmentDto {
  @IsNotEmpty()
  @ApiProperty()
  CUE: string;

  @IsNotEmpty()
  @ApiProperty()
  Anexo: string;
}
