import * as _ from 'lodash';
import * as glob from 'glob';
import * as path from 'path';

import { defaultEnvVariables } from './env/default';
import { devEnvVariables } from './env/development';
import { prodEnvVariables } from './env/production';
import { server } from './assets/default';
const pkg = require('../../package.json');



/**
 * Methode getGlobbedPaths
 * Parcours et récupération des fichiers dans les arrays et globalisation des retours
 * @param globPatterns: string[]
 * @param excludes: string[]
 * @return output: string[]
 */
const getGlobbedPaths = (globPatterns, excludes) => {
  // Définition du regex de recherche
  const urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

  // Initialisation variables
  let output = [];

  // Parcours des arborescences identifiées dans assets et récupération des fichiers
  // Si un array est identifié => parcours de l'ensemble des éléments
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(globPattern => {
      // Ajout de la valeur à l'array de retour
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
    // Si globPatterns est un string => ajout à output
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      // Si excludes existe
      if (excludes) {
        files = files.map(file => {
          // Si excludes est un array
          if (_.isArray(excludes)) {
            // Récupération de la valeur pour chaque position de l'array
            let i;
            for (i in excludes) {
              if (excludes.hasOwnProperty(i)) {
                file = file.replace(excludes[i], '');
              }
            }
            // Si ce n'est pas un array => remplace la valeur
          } else {
            file = file.replace(excludes, '');
          }

          return file;
        });
      }
      // Si excludes n'existe pas
      output = _.union(output, files);
    }
  }

  return output;
};

/**
 * Méthode initGlobalConfigFolders
 * Ajout de paramètres à config
 * @param config: any
 * @param assets: string[]
 */
// tslint:disable-next-line
const initGlobalConfigFolders = (config, assets) => {
  // Initialisation de l'objet
  // Ajout du noeud folders
  config.folders = {
    server: {},
    client: {}
  };

  // Déclaration du répertoire client
  config.folders.client = `${process.cwd()}/src/app`;

};

// tslint:disable-next-line
const initGlobalConfigFiles = (config, assets) => {
  // Initialisation de l'objet
  // Ajout du noeud files
  config.files = {
    server: {},
    client: {}
  };

};

const initGlobalConfig = () => {


  // Récupération des assets configuration
  // Pour le moment récupération uniquement d'un fichier par défaut
  // Il faudra boucler comme les assets environnement..
  // ..si besoin d'avoir des assets de configuration par environnement
  const assets = server;

  // Récupération des assets environnement
  let environmentAssets;
  if (process.env.NODE_ENV === 'production') {
    environmentAssets = _.merge(defaultEnvVariables, prodEnvVariables);
  } else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    environmentAssets = _.merge(defaultEnvVariables, devEnvVariables);
  }

  // Merge des assets de configuration et d'environnement
  // tslint:disable-next-line
  const config = _.merge(assets, environmentAssets);

  // Initialisation des fichiers de configuration
  initGlobalConfigFiles(config, assets);

  // Initialisation des répertoires
  initGlobalConfigFolders(config, assets);

  // Ajout à config de la méthode getGlobbedPaths
  config.utils = {
    getGlobbedPaths: getGlobbedPaths
  };

  return config;
};

export const config = initGlobalConfig();
