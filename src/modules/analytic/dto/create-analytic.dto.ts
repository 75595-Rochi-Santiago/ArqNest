import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnalyticDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  egress_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  discharge_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  broadcast_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  matrix_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  act_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  folio_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  study_plan: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  analytic_type_id: number;
}
