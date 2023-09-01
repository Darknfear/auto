import { BaseEntityCustom } from '@common/base/base.entity';
import { ProfileRole, ProfileStatus } from '@constants/enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('profiles')
export class Profile extends BaseEntityCustom {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
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

  @ManyToOne(() => User, (user) => user.profiles)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
