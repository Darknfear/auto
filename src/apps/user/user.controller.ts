import { AuthService } from '@apps/auth/auth.service';
import { IsAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomRequest } from '@common/interfaces/request.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(IsAuthGuard)
  @Get('me')
  async getMe(@Req() req: CustomRequest) {
    const { user } = req;
    return await this.userService.getMe(user.email);
  }
}
