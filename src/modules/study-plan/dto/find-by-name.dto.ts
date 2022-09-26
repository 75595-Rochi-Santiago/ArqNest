import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudyPlanFilterNameDto {
  @IsNotEmpty()
  @ApiProperty()
  StudyPlan: string;
}
