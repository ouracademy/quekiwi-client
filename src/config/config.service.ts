export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config();
    }

    this.envConfig = process.env;
  }

  get messenger() {
    return {
      apiKey: this.envConfig.MESSENGER_API_KEY,
      verificationToken: this.envConfig.MESSENGER_VERIFICATION_TOKEN,
    };
  }
}
