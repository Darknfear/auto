import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async createUser(
    @Body()
    payload: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ) {
    return await this.authService.createUser(payload);
  }
}
