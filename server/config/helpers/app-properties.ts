import * as path from 'path';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as glob from 'glob';

import { exportDefaultProperties } from '../properties/default.properties';
import { exportDevProperties } from '../properties/development.properties';
import { exportProdProperties } from '../properties/production.properties';
import { exportAssets } from '../assets/default.assets';

let env;
let propertiesFile;

const getGlobbedPaths = (globPatterns, excludes?) => {
  // Définition du regex de recherche
  const urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

  // Initialisation de la variable de retour
  let output = [];

  // Récupération des fichiers
  // globPatterns => permet de déclarer les assets
  // Si le paramètre globPatterns[] => itération sur l'array
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(globPattern => {
      // incrémentation de l'array output de retour
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
    // si le paramètre globPatterns est un string alors il faut pousser la valeur dans l'array output
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      // déclaration de la variable files tel que files prend la valeur du nom du fichier si cela correspond au pattern
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(file => {
          if (_.isArray(excludes)) {
            let i;
            for (i in excludes) {
              if (excludes.hasOwnProperty(i)) {
                file = file.replace(excludes[i], '');
              }
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      // Passage de l'ensemble des fichiers trouvés à la valeur output
      output = _.union(output, files);
    }
  }
  return output;

};


const initGlobalPropFiles: any = (initProperties, assets) => {
  initProperties.files = {
    server: {},
    client: {}
  };

  // Récupération du fichier gulp
  initProperties.files.server.gulp = getGlobbedPaths(assets.server.gulpConfig);

  // Récupération allTS
  initProperties.files.server.allTS = getGlobbedPaths(assets.server.allTS);

  // Récupération config
  initProperties.files.server.config = getGlobbedPaths(assets.server.config);

  // Récupération models
  initProperties.files.server.models = getGlobbedPaths(assets.server.models);

  // Récupération routes
  initProperties.files.server.routes = getGlobbedPaths(assets.server.routes);

};


const validateEnvironementDefinition: any = () => {
  if (!process.env.NODE_ENV) {
    console.warn(`ALerte: Environnement d'exécution non définie`);
    console.warn(`Application par défaut de l'environnement de développement`);
    process.env.NODE_ENV = 'development';
  }
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

  // Récupération des assets
  const assets = exportAssets;

  // Initialisation des fichiers
  initGlobalPropFiles(initProperties, assets);

  return initProperties;

};

export const properties = initGlobalProperties();

