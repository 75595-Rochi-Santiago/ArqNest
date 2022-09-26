import { IUsersEstablishment } from '@modules/authorization/interfaces/users-establishment.interface';

export interface IEstablishment {
  created_at: Date;
  updated_at: null;
  deleted_at: null;
  id: number;
  establishment_id: number;
  user_id: number;
  is_active: boolean;
  users_establishment: IUsersEstablishment;
}
