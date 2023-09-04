import { UserRepository } from '@apps/user/user.repository';
import { UserService } from '@apps/user/user.service';
import { JwtPayload } from '@common/interfaces/jwt.interface';
import { ProfileRole, UserStatus } from '@constants/enum';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '@utilities/account-utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.userService.create(payload);
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    if (user.status === UserStatus.PENDING) {
      throw new BadRequestException('User not active!');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Info incorrect!');
    }
    const jwtPayload: JwtPayload = {
      email: user.email,
      status: user.status,
      role: ProfileRole.USER,
    };
    const token = this.signJwt(jwtPayload);
    return { id: user.id, accessToken: token };
  }

  private signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
