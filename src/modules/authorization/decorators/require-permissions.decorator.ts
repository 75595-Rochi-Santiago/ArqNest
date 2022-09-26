import { SetMetadata } from '@nestjs/common';
import { EPermissions } from '@modules/authorization/enums/persmissions.enum';

export const ACTIONS_KEY = 'actions';
export const RequirePermissions = (...actions: EPermissions[]) =>
  SetMetadata(ACTIONS_KEY, actions);
