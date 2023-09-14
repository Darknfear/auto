import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import { LoginRequestDto } from './dtos/request/login-request.dto';
import { RegisterResponseDto } from './dtos/response/register.response.dto';
import { ApiException } from '@common/interfaces/api-exception';
import { LoginDtoResponse } from './dtos/response/login.reponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: RegisterResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  async createUser(
    @Body()
    payload: RegisterRequestDto,
  ) {
    return await this.authService.createUser(payload);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: HttpStatus.OK, type: LoginDtoResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  async login(@Body() payload: LoginRequestDto) {
    return await this.authService.login(payload);
  }
}
