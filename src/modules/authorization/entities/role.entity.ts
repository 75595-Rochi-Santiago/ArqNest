import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { User } from '@modules/user/entities/user.entity';
import { DefaultActions } from '@modules/authorization/entities/default-actions.entity';
import { UserRole } from './user-roles.entity'
@Entity({ name: 'roles' })
export class Role extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.user_roles_role)
  roles_user_roles: User[];

  @OneToMany(() => DefaultActions, (defaultRole) => defaultRole.default_actions_role)
  role_default_actions: DefaultActions[];
}
