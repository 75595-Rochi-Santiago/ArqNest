import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ACTIONS_KEY } from '@modules/authorization/decorators/require-permissions.decorator';
import { EPermissions } from '@modules/authorization/enums/persmissions.enum';
import { mapRoles } from '@modules/authorization/utils/map-roles.util';
import { ERoles } from '@modules/authorization/enums/roles.enum';
import { IUser } from '@modules/authorization/interfaces/user.interface';
import { findRole } from '@modules/authorization/utils/find-role.utils';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<EPermissions[]>(
      ACTIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: IUser } = context.switchToHttp().getRequest();

    const ACTIONS = mapRoles(user);

    return findRole(user, ERoles.SUPER_ADMIN)
      ? true
      : requiredRoles.some((role) => ACTIONS.includes(role));
  }
}
