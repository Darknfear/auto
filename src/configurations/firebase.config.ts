import { ConfigurationsService } from './configurations.service';

class FirebaseConfig extends ConfigurationsService {
  get config() {
    return {
      deepLink: {
        apiKey: process.env.DEEP_LINK_API_KEY,
        domainPrefix: process.env.DEEP_LINK_DOMAIN_PREFIX,
        androidPackageName: process.env.ANDROID_PACKAGE_NAME,
        iosBundleId: process.env.IOS_PACKAGE_NAME,
      },
      notification: {},
    };
  }
}

export default new FirebaseConfig().config;
