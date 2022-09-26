import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@core/classes/base.entity'
import { UserRole } from '@modules/authorization/entities/user-roles.entity'
import { EstablishmentUser } from '@modules/establishment/entities/establishment-user.entity'

@Entity({ name: 'users' })
export class User extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  google_picture: string;

  @Column({ select: false })
  google_access_token: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.user_roles_users)
  user_roles_user: UserRole[];

  @OneToMany(() => EstablishmentUser, (establishmentUser) => establishmentUser.establishment_user)
  user_establishments: EstablishmentUser[]
}
