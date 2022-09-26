import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class GetAnalyticsDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  page: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  limit: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(4, 20)
  term: string;
}
