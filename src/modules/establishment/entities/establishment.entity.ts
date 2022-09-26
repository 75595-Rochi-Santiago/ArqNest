import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { EstablishmentUser } from '@modules/establishment/entities/establishment-user.entity';
import { EstablishmentStudyPlan } from '@modules/establishment/entities/establishment_study_plan.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';

@Entity()
export class Establishment extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  situation: string;

  @Column()
  jurisdictional_regulation: string;

  @Column()
  educational_portfolio: string;

  @Column()
  management: string;

  @Column()
  area_or_department: string;

  @Column()
  cue: string;

  @Column()
  annexed: string;

  @Column()
  establishment_name: string;

  @Column()
  turn: string;

  @Column()
  province: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  address: string;

  @Column()
  mail: string;

  @OneToMany(
    () => EstablishmentUser,
    (establishment) => establishment.users_establishment,
  )
  establishment_users: EstablishmentUser[];

  @OneToMany(
    () => EstablishmentStudyPlan,
    (EstablishmentStudyPlan) => EstablishmentStudyPlan.establishment,
    //{ eager: true, cascade: true },
  )
  study_plan: EstablishmentStudyPlan[];

  @OneToMany(() => Analytic, (analytic) => analytic.establishment)
  analytic: Analytic[];
}

