import { exportDefaultProperties } from './default.properties';

const prodProperties = {
  payload: {
    app: {
      title: `${exportDefaultProperties.app.title} - Production`
    },
    server: {
      port: process.env.PORT || 3000,
      host: process.env.HOST || '0.0.0.0',
      domain: process.env.DOMAIN || 'http://localhost.com',
      livereload: true
    },
    env: 'production'
  }
};

export const exportProdProperties = prodProperties.payload;
