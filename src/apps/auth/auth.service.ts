import { UserRepository } from '@apps/user/user.repository';
import { UserService } from '@apps/user/user.service';
import { JwtPayload } from '@common/interfaces/jwt.interface';
import { ProfileRole, UserStatus } from '@constants/enum';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '@utilities/account-utils';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import { ERROR_MESSAGES } from '@constants/message';
import { plainToInstance } from 'class-transformer';
import { LoginDtoResponse } from './dtos/response/login.reponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(payload: RegisterRequestDto) {
    return this.userService.create(payload);
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.findOneBy({
      email,
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

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        ERROR_MESSAGES.INFO_NOT_CORRECT,
        HttpStatus.BAD_REQUEST,
      );
    }
    const jwtPayload: JwtPayload = {
      email: user.email,
      status: user.status,
      role: ProfileRole.USER,
    };
    const token = this.signJwt(jwtPayload);
    return plainToInstance(LoginDtoResponse, {
      accessToken: token,
      id: user.id,
    });
  }

  async updateProfile() {
    return;
  }

  private signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
