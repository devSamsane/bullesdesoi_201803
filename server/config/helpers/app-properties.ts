import * as path from 'path';
import * as _ from 'lodash';
import * as fs from 'fs';

import { exportDefaultProperties } from '../properties/default.properties';
import { exportDevProperties } from '../properties/development.properties';
import { exportProdProperties } from '../properties/production.properties';

let env;
let propertiesFile;

const validateEnvironementDefinition: any = () => {
  if (!process.env.NODE_ENV) {
    console.warn(`ALerte: Environnement d'exécution non définie`);
    console.warn(`Application par défaut de l'environnement de développement`);
    process.env.NODE_ENV = 'development';
  }
  console.log(`Vérification configuration environnement ok - ${process.env.NODE_ENV}`);
  env = process.env.NODE_ENV;

  propertiesFile = choosePropertiesFile(env);
  };

const choosePropertiesFile: any = (envType) => {

  if (envType === 'development') {
    return exportDevProperties;
  } else if (envType === 'production') {
    return exportProdProperties;
  } else {
    return exportDevProperties;
  }

};


const initGlobalProperties: any = () => {

  // Vérification de la variable d'environnement
  validateEnvironementDefinition();

  // Merge des properties
  const initProperties = _.merge(exportDefaultProperties, propertiesFile);

  // Enrichissement avec les informations du package.json
  const pkg = require('../../../package.json');
  initProperties.app.version = pkg.version;

  return initProperties;

};

export const properties = initGlobalProperties();

