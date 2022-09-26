import { Body, Controller, Get, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AssignRoleDto } from '@modules/authorization/dto/assign-actions.dto';
import { AuthorizationService } from '@modules/authorization/services/authorization.service';
import { Role } from '@modules/authorization/entities/role.entity';
import { RequirePermissions } from '@modules/authorization/decorators/require-permissions.decorator';
import { EPermissionsAuthorizations } from '@modules/authorization/enums/permissions-authorization.enum';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { PermissionsGuard } from '@modules/authorization/guards/permissions.guard';

@ApiTags('authorization')
@UseGuards(JwtGuard, PermissionsGuard)
@Controller('authorization')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @RequirePermissions(EPermissionsAuthorizations.CreateAuthorization)
  @ApiResponse({
    description: 'Añadir rol y establecimiento a un usuario',
    type: AssignRoleDto,
  })
  async assign(@Body() assignRole: AssignRoleDto) {
    return await this.authorizationService.assignRole(assignRole);
  }

  @Get('/roles/all')
  @RequirePermissions(EPermissionsAuthorizations.ReadAuthorization)
  @ApiResponse({
    description: 'Retorna un lista de objetos de establecimientos',
    type: [Role],
  })
  getRoles() {
    return this.authorizationService.getAllRoles();
  }
}
