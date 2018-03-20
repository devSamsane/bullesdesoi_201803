import * as path from 'path';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as glob from 'glob';
import * as chalk from 'chalk';

import { exportDefaultProperties } from './env/default.properties';
import { exportDevProperties } from './env/development.properties';
import { exportProdProperties } from './env/production.properties';
import { exportAssets } from './assets/default.assets';


class PropertiesConfiguration {
  static env: string = process.env.NODE_ENV;
  static propertiesFile: any;

  constructor() { }

  /**
   * Parcours des noeuds et des arrays des assets et renvoi la liste des fichiers des répertoires
   * @method getGlobbedPaths
   * @private
   * @param {*} globPatterns
   * @param {*} [excludes]
   * @returns {array}
   * @memberof PropertiesConfiguration
   */
  private static getGlobbedPaths(globPatterns: any, excludes?: any): any {
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
        output = _.union(output, this.getGlobbedPaths(globPattern, excludes));
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
  }


  /**
   * Récupération des fichiers ts et associations dans un noeud spécifique du fichier properties
   * @method initGlobalPropertiesFiles
   * @private
   * @param {object} properties
   * @param {object} assets
   * @memberof PropertiesConfiguration
   */
  private static initGlobalPropertiesFiles(properties: any, assets: any): any {
    // Initialisation des nodes de l'object
    properties.files = {
      server: {},
      client: {}
    };

    // Récupération du fichier GULP
    properties.files.server.gulp = this.getGlobbedPaths(assets.server.gulpConfig);

    // Récupération des fichiers allTS
    properties.files.server.allTS = this.getGlobbedPaths(assets.server.allTS);

    // Récupération des fichiers de config des modules
    properties.files.server.configs = this.getGlobbedPaths(assets.server.config);

    // Récupération des fichiers de stratégies passport
    properties.files.server.strategies = this.getGlobbedPaths(assets.server.strategies);

    // Récupération des fichiers de models des modules
    properties.files.server.models = this.getGlobbedPaths(assets.server.models);

    // Récupération des routes des modules
    properties.files.server.routes = this.getGlobbedPaths(assets.server.routes);

    // Récupération des policies
    properties.files.server.policies = this.getGlobbedPaths(assets.server.policies);

  }


  /**
   * Choix du fichier de properties selon l'environnement
   * @method selectPropertiesFileByEnv
   * @private
   * @param {string} envType
   * @returns {object} properties dépendant de l'environnement
   * @memberof PropertiesConfiguration
   */
  private static selectPropertiesFileByEnv(envType: string): any {

    if (envType === 'development') {
      return exportDevProperties;
    } else if (envType === 'production') {
      return exportProdProperties;
    } else {
      return exportDevProperties;
    }

  }


  /**
   * Validation que l'environnement est bien configuré
   * @method validateEnvironmentDefinition
   * @private
   * @memberof PropertiesConfiguration
   */
  private static validateEnvironmentDefinition(): any {
    if (!process.env.NODE_ENV) {
      console.warn(`ALerte: Environnement d'exécution non définie`);
      console.warn(`Application par défaut de l'environnement de développement`);
      process.env.NODE_ENV = 'development';
    }

    this.propertiesFile = this.selectPropertiesFileByEnv(this.env);
  }

  /**
   * Validation de la présence des certificats pour activer le mode ssl
   * @private
   * @static
   * @param {any} properties objet properties
   * @returns {boolean}
   * @memberof PropertiesConfiguration
   */
  private static validateSecureMode(properties): boolean {
    if (!properties.server.secure || properties.server.secure.ssl !== true) {
      return true;
    }

    const RSA_PRIVATE_KEY = fs.readFileSync('./server/lib/config/sslcerts/key.pem');
    const RSA_PUBLIC_KEY = fs.readFileSync('./server/lib/config/sslcerts/cert.pem');

    if (!RSA_PRIVATE_KEY || !RSA_PUBLIC_KEY) {
      console.log(chalk.red('+ Error: Certicat ou clé manquants,retour à un non-SSL mode'));
      console.log();
      properties.server.secure.ssl = false;
    }
  }


  /**
   * Initialisation de l'objet properties
   * Contient l'ensemble des paramètres de l'application
   * @method initGlobalProperties
   * @returns {*} properties
   * @memberof PropertiesConfiguration
   */
  static initGlobalProperties(): any {

    // Vérification de la variables d'environnement
    this.validateEnvironmentDefinition();

    // Merge des fichiers de properties local + environnement
    // les properties de environnement écrasent celles de local
    const properties = _.merge(exportDefaultProperties, this.propertiesFile);

    // Enrichissement des properties avec les informations du package.json
    const pkg = require('../../../package.json');
    properties.app.version = pkg.version;

    // Récupération des assets
    const assets = exportAssets;

    // Initialisation des assets
    this.initGlobalPropertiesFiles(properties, assets);

    // Vérification du mode SSL
    this.validateSecureMode(properties);

    // Exposition des utilitaires
    properties.utils = {
      getGlobbedPaths: this.getGlobbedPaths
    };

    return properties;

  }

}
module.exports = PropertiesConfiguration.initGlobalProperties();
