import { IUserResponse } from '@modules/user/interfaces/user-response.interface';
import { mapEstablishment } from '@modules/authorization/utils/map-establishment.utils';

export const mapUserProfile = (user: any): IUserResponse => {
  if (!user) return null;

  const {
    id,
    email,
    first_name,
    last_name,
    google_picture,
    is_active,
    user_roles_user,
    user_establishments,
  } = user;

  const roleMaps = user_roles_user.map(
    ({ user_roles_role, id: roleId, is_active }) => {
      return {
        name: user_roles_role.name,
        role_id: user_roles_role.id ?? null,
        is_active: is_active,
        actions: user_roles_role.role_default_actions.map(
          ({ resource, is_active }) => {
            return {
              resource: resource,
              is_active: is_active,
            };
          },
        ),
      };
    },
  );

  const establishmentMaps = mapEstablishment(user_establishments);

  return {
    id,
    email,
    first_name,
    last_name,
    google_picture,
    is_active,
    establishments: establishmentMaps,
    roles: roleMaps,
  };
};
