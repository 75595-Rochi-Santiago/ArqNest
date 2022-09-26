import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudyPlanDto {
  @IsNotEmpty()
  @ApiProperty()
  study_plan: string;

  @IsNotEmpty()
  @ApiProperty()
  amending_resolution: string;

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  additional_title_description: string;

  @IsNotEmpty()
  @ApiProperty()
  equivalence_Law_26206: string;

  @IsNotEmpty()
  @ApiProperty()
  standard_approval: string;

  @IsNotEmpty()
  @ApiProperty()
  standard_ratification_judgment: string;

  @IsNotEmpty()
  @ApiProperty()
  number_rfifd: string;

  @IsNotEmpty()
  @ApiProperty()
  national_validity_granted_by: string;

  @IsNotEmpty()
  @ApiProperty()
  study_plan_status: { id: number };

  @IsNotEmpty()
  @ApiProperty()
  study_plan_curricular_box: [
    {
      level: string;
      course: string;
    },
  ];
}
