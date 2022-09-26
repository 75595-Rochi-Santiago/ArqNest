import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEstablishmentDto {
  @ApiProperty()
  situation: string;

  @ApiProperty()
  jurisdictional_regulation: string;

  @ApiProperty()
  educational_portfolio: string;

  @ApiProperty()
  management: string;

  @ApiProperty()
  area_or_department: string;

  @ApiProperty()
  cue: string;

  @ApiProperty()
  annexed: string;

  @ApiProperty()
  establishment_name: string;

  @ApiProperty()
  turn: string;

  @ApiProperty()
  province: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  mail: string;

  @ApiProperty()
  study_plan: string;
}
