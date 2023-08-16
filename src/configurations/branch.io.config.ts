import { ConfigurationsService } from './configurations.service';

class BranchIoConfig extends ConfigurationsService {
  get config() {
    return {
      branchIo: {
        apiEndpoint: process.env.BRANCH_IO_ENDPOINT,
        apiKey: process.env.DEEP_LINK_API_KEY,
        secret: process.env.DEEP_LINK_SECRET,
      }
    };
  }
}

export default new BranchIoConfig().config;
