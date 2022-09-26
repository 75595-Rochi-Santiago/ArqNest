import { IsArray, IsEnum, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { ERoles } from '@modules/authorization/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @IsNumber()
  @ApiProperty()
  user_id: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty()
  @IsEnum(ERoles, { message: 'There is an invalid role in the array', each: true })
  roles: number[];

  @IsNumber({}, { each: true })
  @ApiProperty()
  @IsOptional()
  establishments: number[];
}
