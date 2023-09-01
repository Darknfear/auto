import { UserService } from '@apps/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createUser(payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.userService.create(payload);
  }
}
