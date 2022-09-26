import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { Role } from '@modules/authorization/entities/role.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity({ name: 'users_roles' })
export class UserRole extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  role_id: number;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @ManyToOne(() => Role, (role) => role.roles_user_roles)
  @JoinColumn({ name: 'role_id' })
  user_roles_role: Role;

  @ManyToOne(() => User, (user) => user.user_roles_user)
  @JoinColumn({ name: 'user_id' })
  user_roles_users: User[];
}
