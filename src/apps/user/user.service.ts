import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { hashPassword } from '@utilities/account-utils';
import { Profile } from '@entities/profile.entity';
import { UserStatus } from '@constants/enum';
import { plainToInstance } from 'class-transformer';
import { MeResponseDto } from './dtos/response/me-response.dto';
import { RegisterRequestDto } from '@apps/auth/dtos/request/register-request.dto';
import { ERROR_MESSAGES } from '@constants/message';
import { RegisterResponseDto } from '@apps/auth/dtos/response/register.response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create({ email, password, firstName, lastName }: RegisterRequestDto) {
    let user: User = await this.userRepository.findOneBy({
      email,
    });
    if (user) {
      throw new HttpException(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
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
    return plainToInstance(RegisterResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getMe(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['profiles'],
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.status === UserStatus.PENDING) {
      throw new HttpException(
        ERROR_MESSAGES.ACCOUNT_NOT_ACTIVE,
        HttpStatus.BAD_REQUEST,
      );
    }

    return plainToInstance(MeResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
