import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneParamsDto {
  @IsNumberString()
  @ApiProperty()
  id: number;
}
