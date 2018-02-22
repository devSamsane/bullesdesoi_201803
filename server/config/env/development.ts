// Import des variables par défault
import { defaultEnvVariables } from './default';

export const devEnvVariables =  {
  app: {
    title: `${defaultEnvVariables.app.title} - Environnement de developpement`
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  domain: process.env.DOMAIN || 'http://localhost',
  livereload: true
};
