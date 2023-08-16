import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketGateway } from './socket.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationsService } from '@configs/configurations.service';
import { ConfigurationsEnum } from '@configs/configurations.enum';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    JwtModule.register({
      secret: new ConfigurationsService().get(ConfigurationsEnum.JWT_SECRET),
      signOptions: {
        expiresIn: new ConfigurationsService().get(
          ConfigurationsEnum.JWT_EXPIRE_IN,
        ),
      },
    }),
  ],
  providers: [SocketGateway, ConfigurationsService],
  exports: [SocketGateway],
})
export class SocketModule {}
