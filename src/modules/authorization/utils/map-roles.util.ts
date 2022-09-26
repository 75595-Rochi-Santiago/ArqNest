import { IUser } from '@modules/authorization/interfaces/user.interface';

export const mapRoles = (user: IUser) => {
  const ACTIONS: string[] = [];
  user.roles.map((rol) =>
    rol.actions.map((action) => ACTIONS.push(action.resource)),
  );
  return ACTIONS;
};
