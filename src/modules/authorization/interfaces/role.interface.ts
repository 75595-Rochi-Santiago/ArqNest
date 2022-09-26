import { IAction } from '@modules/authorization/interfaces/action.interface';

export interface IRole {
  name: string;
  role_id: number;
  is_active: boolean;
  actions: IAction[];
}
