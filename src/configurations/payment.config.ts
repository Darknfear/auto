import { ConfigurationsService } from './configurations.service';

class PaymentConfig extends ConfigurationsService {
  get config() {
    return {
      stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        webhookUrl: process.env.STRIPE_WEBHOOK,
        currency: process.env.STRIPE_CURRENCY || 'aud',
      },
    };
  }
}

export default new PaymentConfig().config;
