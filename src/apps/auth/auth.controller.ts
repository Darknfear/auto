import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import { LoginRequestDto } from './dtos/request/login-request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body()
    payload: RegisterRequestDto,
  ) {
    return await this.authService.createUser(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginRequestDto) {
    return await this.authService.login(payload);
  }
}
