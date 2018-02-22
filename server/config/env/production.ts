// Import des variables par défault
import { defaultEnvVariables } from './default';

export const prodEnvVariables =  {
  app: {
    title: `${defaultEnvVariables.app.title} - Environnement de production`
  },
  port: '',
  host: '',
  domain: '',
  livereload: ''
};
