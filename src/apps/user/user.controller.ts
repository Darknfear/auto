import { IsAuthGuard } from '@guards/jwt-auth.guard';
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomRequest } from '@common/interfaces/request.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MeResponseDto } from './dtos/response/me-response.dto';
import { ApiException } from '@common/interfaces/api-exception';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(IsAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get info user' })
  @ApiResponse({ status: HttpStatus.OK, type: MeResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  async getMe(@Req() req: CustomRequest) {
    const { user } = req;
    return await this.userService.getMe(user.email);
  }
}
