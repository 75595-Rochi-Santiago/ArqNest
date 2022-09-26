import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { GetUser } from '@modules/auth/decorators/get-user.decorator';
import { User } from '@modules/user/entities/user.entity';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { PermissionsGuard } from '@modules/authorization/guards/permissions.guard';
import { RequirePermissions } from '@modules/authorization/decorators/require-permissions.decorator';
import { EPermissionsUsers } from '@modules/user/enums/permissions-users.enum';
import { GetUsersDto } from '@modules/user/dto/get-users.dto';
import { UserService } from '@modules/user/services/user.service';
import { FindOneParamsDto } from '../dto/find-one-params.dto';

@ApiTags('user')
@ApiHeader({
  name: 'Authorization',
  description: 'Recurso para acceder a los datos del usuario logueado',
  example: 'Bearer <token>',
})
@Controller('user')
@UseGuards(JwtGuard, PermissionsGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  private pathUrl = this.configService.get<string>('BE_HOST_PATH');

  @Get()
  @ApiResponse({
    description: 'Obtener lista de usuarios paginada',
    type: User,
  })
  @RequirePermissions(EPermissionsUsers.ReadUser)
  async getAllUsers(@Query() getUsersDto: GetUsersDto) {
    const route = `${this.pathUrl}/user`;
    return await this.userService.getAllUsers(getUsersDto, route);
  }

  @Get('/me')
  @ApiResponse({
    description: 'Obtener datos del perfil loggeado',
    type: User,
  })
  async me(@GetUser() user: any) {
    return user;
  }

  @Delete(':id')
  @ApiResponse({
    description: 'SoftDelete de un usuario',
    type: User,
  })
  @RequirePermissions(EPermissionsUsers.DeleteUser)
  async deleteUser(@Param() findOneParamsDto: FindOneParamsDto) {
    return await this.userService.deleteUser(findOneParamsDto);
  }

  @Get('/:id')
  getUserById(@Param() findOneParamsDto: FindOneParamsDto) {
    const { id } = findOneParamsDto;
    return this.userService.getUserProfile(id);
  }
}
