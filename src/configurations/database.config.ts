import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigurationsService } from './configurations.service';

class DatabaseConfig extends ConfigurationsService {
  get config(): TypeOrmModuleOptions {
    console.log(`env ${process.env.DB_HOST}`);
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 8001),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        'dist/databases/entities/*.entity.{ts,js}',
        join(__dirname, '**', '*.entity.{ts,js}'),
      ],
      synchronize: false,
      logging: true,
    };
  }
}

export default new DatabaseConfig().config;
