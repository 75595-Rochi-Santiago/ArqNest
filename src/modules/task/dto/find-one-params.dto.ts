import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneParams {
  @IsNumberString()
  @ApiProperty()
  id: number;
}
