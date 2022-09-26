import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}
