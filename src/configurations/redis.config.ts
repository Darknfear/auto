import { ConfigurationsService } from './configurations.service';

class RedisConfig extends ConfigurationsService {
  get config() {
    return {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    };
  }
}

export default new RedisConfig().config;
