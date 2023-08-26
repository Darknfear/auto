import { BaseEntityCustom } from '@common/base/base.entity';
import { ProfileRole, ProfileStatus } from '@constants/enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('profiles')
export class Profile extends BaseEntityCustom {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dob: Date;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  role: ProfileRole;

  @Column()
  status: ProfileStatus;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
