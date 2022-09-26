import { IRole } from '@modules/authorization/interfaces/role.interface';

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  google_picture: string;
  is_active: boolean;
  roles: IRole[];
}
