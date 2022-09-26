import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { User } from '@modules/user/entities/user.entity'
import { Establishment } from './establishment.entity'

@Entity({ name: 'establishments_users' })
export class EstablishmentUser extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  establishment_id: number;

  @Column()
  user_id: number;

  @Column()
  is_active: boolean;

  @ManyToOne(() => User, (user) => user.user_establishments)
  @JoinColumn({ name: 'user_id' })
  establishment_user: User[];

  @ManyToOne(() => Establishment, (establishment) => establishment.establishment_users)
  @JoinColumn({ name: 'establishment_id' })
  users_establishment: Establishment[];
}
