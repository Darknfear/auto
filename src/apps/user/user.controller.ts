import { AuthService } from '@apps/auth/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {}
}
