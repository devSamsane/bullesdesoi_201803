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
    env: 'development'
  }
};

export const exportDevProperties = devProperties.payload;

