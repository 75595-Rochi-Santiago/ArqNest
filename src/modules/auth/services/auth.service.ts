import { Injectable } from '@nestjs/common';

import { UserService } from '@modules/user/services/user.service';
import { CreateUserGoogleDto } from '@modules/user/dto/create-user-google.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private usersServices: UserService,
  ) {}

  async createUserByGoogle(user: any) {
    try {
      const userLogged: CreateUserGoogleDto = {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        google_access_token: user.accessToken,
        google_picture: user.picture,
        is_active: true,
      };

      const findUser = await this.usersServices.findUserRegisteredGoogle(
        user.email,
        user.accessToken,
      );

      if (findUser) return await this.login(findUser);

      const userSaved = await this.usersServices.createUserByGoogle(userLogged);
      return await this.login(userSaved);
    } catch (error) {}
  }

  async login(user: User) {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }

  async verify(token: string): Promise<User> {
    const secret = this.configService.get<string>('JWT_SECRET');
    const { userId } = this.jwtService.verify(token, {
      secret,
    });

    return await this.usersServices.findUser(userId);
  }

  async generateRefreshToken(user: User) {
    const secret = this.configService.get<string>('JWT_SECRET_REFRESH');
    const { id } = user;
    return this.jwtService.sign(
      {},
      {
        expiresIn: '1d',
        subject: String(id),
        secret,
      },
    );
  }

  async generateAccessToken(user: User) {
    const payload: JwtSignOptions = {
      subject: String(user.id),
    };
    return this.jwtService.sign(payload);
  }
}
