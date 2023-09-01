import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@apps/user/user.service';
import { UserModule } from '@apps/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
