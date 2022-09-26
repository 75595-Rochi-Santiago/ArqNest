import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdAnalitycalStatusDto {
  @IsNumberString()
  @ApiProperty()
  state: number;
}
