import { exportDefaultProperties } from './default.properties';

const devProperties = {
  payload: {
    app: {
      title: `${exportDefaultProperties.app.title} - Développement`
    },
    server: {
      port: process.env.PORT || 3000,
      host: process.env.HOST || '0.0.0.0',
      domain: process.env.DOMAIN || 'http://localhost.com',
      livereload: true
    },
    env: 'development',
    config: {
      db: {
        uri: process.env.MONGODB_URI || `mongodb://${process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost'}/bullesdesoi-dev`,
        debug: process.env.MONGODB_DEBUG || false
      },
      recaptcha: {
        secret: process.env.RECAPTCHA_KEY
      }
    }
  }
};

export const exportDevProperties = devProperties.payload;

