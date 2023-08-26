import { BaseEntityCustom } from '@common/base/base.entity';
import { UserStatus } from '@constants/enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('users')
export class User extends BaseEntityCustom {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
