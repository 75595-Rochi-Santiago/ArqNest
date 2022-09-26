export interface IUserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  google_picture: string;
  is_active: boolean;
  establishments: Establishment[];
  roles: Role[];
}

export interface Establishment {
  id: number;
  is_active: boolean;
  details: Details;
}

export interface Details {
  name: string;
  mail: string;
  establishment_id: number;
  city: string;
  cue: string;
}

export interface Role {
  name: string;
  role_id: number;
  is_active: boolean;
  actions: Action[];
}

export interface Action {
  resource: string;
  is_active: boolean;
}
