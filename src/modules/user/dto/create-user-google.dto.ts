import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserGoogleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  google_picture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  google_access_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
