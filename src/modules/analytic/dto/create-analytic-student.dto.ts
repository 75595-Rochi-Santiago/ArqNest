import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';

import { CreateAnalyticDto } from '@modules/analytic/dto/create-analytic.dto';
import { CreateStudentDto } from '@modules/analytic/dto/create-student.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnalyticStudentDto {
  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateStudentDto)
  student: CreateStudentDto;

  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAnalyticDto)
  analytic: CreateAnalyticDto;
}
