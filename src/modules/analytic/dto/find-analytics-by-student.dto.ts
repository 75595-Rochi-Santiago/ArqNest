import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalitycalByStudentDto {
  @IsNumberString()
  @ApiProperty()
  documentTypeId: number;

  @IsNumberString()
  @ApiProperty()
  documentNumber: number;
}
