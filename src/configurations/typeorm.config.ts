import { DataSource } from 'typeorm';
import { ConfigurationsService } from './configurations.service';

class TypeORMConfig extends ConfigurationsService {
  get connectionSource() {
    return new DataSource({
      migrationsTableName: 'migrations',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 8001),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: false,
      synchronize: false,
      name: 'default',
      entities: ['src/databases/entities/**.entity{.ts,.js}'],
      migrations: ['src/databases/migrations/**/*{.ts,.js}'],
      subscribers: ['src/databases/subscriber/**/*{.ts,.js}'],
    });
  }
}

export default new TypeORMConfig().connectionSource;
