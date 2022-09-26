import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { Role } from '@modules/authorization/entities/role.entity';

@Entity({ name: 'default_actions' })
export class DefaultActions extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_id: number;

  @Column()
  resource: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @ManyToOne(() => Role, (role) => role.role_default_actions)
  @JoinColumn({ name: 'role_id' })
  default_actions_role: Role;
}
