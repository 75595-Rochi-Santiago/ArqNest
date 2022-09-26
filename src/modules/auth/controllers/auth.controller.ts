import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetUser } from '@modules/auth/decorators/get-user.decorator';
import { AuthService } from '@modules/auth/services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  @ApiOkResponse({
    description: 'Envia a OAuth de Google',
  })
  async googleAuth() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  @ApiOkResponse({
    description:
      'Redirecciona a la página de inicio de sesión del frontend retornando una url tipo: http://frontend_host/auth/google?accessToken=...&refreshToken=..., del cual debe tomar el accessToken y el refreshToken para poder consumir endpoints de la API',
  })
  async googleAuthRedirect(@GetUser() user: any, @Res() res: Response) {
    try {
      const FE_URL_REDIRECT = this.configService.get<string>('FE_URL_REDIRECT');

      const { accessToken, refreshToken } =
        await this.authService.createUserByGoogle(user);

      res.redirect(
        `${FE_URL_REDIRECT}?accessToken=${accessToken ?? null}&refreshToken=${
          refreshToken ?? null
        }`,
      );
    } catch (error) {
      console.error(`Error 11452: ${error}`);
    }
  }
}
