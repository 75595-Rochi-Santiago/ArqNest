import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudyPlanDto {
  @ApiProperty()
  studyPlan: string;

  @ApiProperty()
  resolution: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  aditionalDescription: string;

  @ApiProperty()
  equivalenceLaw: string;

  @ApiProperty()
  jurisdictionalStandardApproval: number;

  @ApiProperty()
  jurisdictionalRuleOfRatification: string;

  @ApiProperty()
  amendingResolution: string;

  @ApiProperty()
  inscriptionRFIFD: string;

  @ApiProperty()
  nationalValidity: string;

  @ApiProperty()
  study_plan_status: string;

  @ApiProperty()
  curricularSpace: [
    {
      level: string;
      course: string;
    },
  ];
}
