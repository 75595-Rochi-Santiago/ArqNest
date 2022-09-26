import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 50)
  birthplace: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birth_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  document_type_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  document_number: string;
}
