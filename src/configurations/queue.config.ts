import { ProcessorType } from '@constants/enum';
import { ConfigurationsService } from './configurations.service';

class QueueConfig extends ConfigurationsService {
  get config() {
    return {
      sendMailProcessor: `${ProcessorType.SEND_MAIL_PROCESSOR}-${process.env.npm_package_name}-${process.env.NODE_ENV}`,
    };
  }
}

export default new QueueConfig().config;
