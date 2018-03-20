import { exportDefaultProperties } from './default.properties';

const devProperties = {
  payload: {
    app: {
      title: `${exportDefaultProperties.app.title} - Développement`
    },
    server: {
      port: process.env.PORT || 3000,
      host: process.env.HOST || '127.0.0.1',
      domain: process.env.DOMAIN || 'localhost',
      livereload: true,
      secure: {
        ssl: true,
        privateKey: '../sslcerts/key.pem',
        certificate: '../sslcerts/cert.pem'
      }
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

