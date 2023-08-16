import { ConfigurationsService } from './configurations.service';

class S3Config extends ConfigurationsService {
  get config() {
    return {
      region: process.env.S3_REGION,
      bucketName: process.env.S3_BUCKET_NAME,
      accessKey: process.env.S3_ACCESS_KEY,
      secretKey: process.env.S3_SECRET_KEY,
      prefix: process.env.S3_MEDIA_PREFIX,
    };
  }
}

export default new S3Config().config;
