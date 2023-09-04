import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// config
import DBConfig from '@configs/database.config';
import { Apps } from './apps';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(DBConfig),
    JwtModule.register({
      global: true,
      secret: String(process.env.JWT_SECRET),
      signOptions: {
        expiresIn: `${process.env.JWT_EXPIRE_IN || 5}day`,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ...Apps,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
