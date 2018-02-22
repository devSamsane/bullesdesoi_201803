import * as _ from 'lodash';

import { defaultEnvVariables } from './env/default';
import { devEnvVariables } from './env/development';
import { prodEnvVariables } from './env/production';


const initGlobalConfig = () => {


    // Récupération de la configuration par environnement
    if (process.env.NODE_ENV === 'production') {
      const configProp =  _.merge(defaultEnvVariables, prodEnvVariables);
      return configProp;
    } else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const configProp =  _.merge(defaultEnvVariables, devEnvVariables);
      return configProp;
    }

};

export const config = initGlobalConfig();
