import { BaseEntityCustom } from '@common/base/base.entity';
import { UserStatus } from '@constants/enum';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('users')
export class User extends BaseEntityCustom {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;

  @OneToMany(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profiles: Profile[];
}
