import { IRole } from '@modules/authorization/interfaces/role.interface';
import { IUser } from '@modules/authorization/interfaces/user.interface';
import { ERoles } from '@modules/authorization/enums/roles.enum';

export const findRole = (user: IUser, roleSearch: ERoles) => {
  const predicate = (role: IRole) => role.role_id === roleSearch;
  return user.roles.some(predicate);
};
