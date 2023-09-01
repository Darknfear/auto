import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { hashPassword } from '@utilities/account-utils';
import { Profile } from '@entities/profile.entity';
import { UserStatus } from '@constants/enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    let user = await this.userRepository.findOneBy({
      email,
    });
    if (user) {
      throw new BadRequestException('Account was exist!');
    }
    await this.dataSource.manager.transaction(async (manager) => {
      const hash = await hashPassword(password);
      user = await manager.getRepository(User).save({ email, password: hash });
      const profile = manager
        .getRepository(Profile)
        .create({ user, firstName: firstName, lastName: lastName });
      user.profiles = [profile];
      await Promise.all([
        manager.getRepository(User).save(user),
        manager.getRepository(Profile).save(profile),
      ]);
    });
    return { id: user.id };
  }
}
