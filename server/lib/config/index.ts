import * as path from 'path';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as glob from 'glob';

import { exportDefaultProperties } from './env/default.properties';
import { exportDevProperties } from './env/development.properties';
import { exportProdProperties } from './env/production.properties';
import { exportAssets } from './assets/default.assets';

class PropertiesConfiguration {
  public env;
  public propertiesFile;

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
  private getGlobbedPaths(globPatterns: any, excludes?: any): any {
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
   * @param {object} initProperties
   * @param {object} assets
   * @memberof PropertiesConfiguration
   */
  private initGlobalPropertiesFiles(initProperties: any, assets: any): any {
    // Initialisation du noeud de l'object
    initProperties.files = {
      server: {},
      client: {}
    };

    // Récupération du fichier GULP
    initProperties.files.server.gulp = this.getGlobbedPaths(assets.server.gulpConfig);

    // Récupération des fichiers allTS
    initProperties.files.server.allTS = this.getGlobbedPaths(assets.server.allTS);

    // Récupération des fichiers de config des modules
    initProperties.files.server.config = this.getGlobbedPaths(assets.server.config);

    // Récupération des fichiers de models des modules
    initProperties.files.server.models = this.getGlobbedPaths(assets.server.models);

    // Récupération des routes des modules
    initProperties.files.server.routes = this.getGlobbedPaths(assets.server.routes);

  }


  /**
   * Choix du fichier de properties selon l'environnement
   * @method selectPropertiesFileByEnv
   * @private
   * @param {string} envType
   * @returns {object} properties dépendant de l'environnement
   * @memberof PropertiesConfiguration
   */
  private selectPropertiesFileByEnv(envType: string): any {

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
  private validateEnvironmentDefinition(): any {
    if (!process.env.NODE_ENV) {
      console.warn(`ALerte: Environnement d'exécution non définie`);
      console.warn(`Application par défaut de l'environnement de développement`);
      process.env.NODE_ENV = 'development';
    }
    this.env = process.env.NODE_ENV;

    this.propertiesFile = this.selectPropertiesFileByEnv(this.env);
  }


  /**
   * Initialisation de l'objet properties
   * Contient l'ensemble des paramètres de l'application
   * @method initGlobalProperties
   * @returns {*} initProperties
   * @memberof PropertiesConfiguration
   */
  public initGlobalProperties(): any {

    // Vérification de la variables d'environnement
    this.validateEnvironmentDefinition();

    // Merge des fichiers de properties local + environnement
    // les properties de environnement écrasent celles de local
    const initProperties = _.merge(exportDefaultProperties, this.propertiesFile);

    // Enrichissement des properties avec les informations du package.json
    const pkg = require('../../../package.json');
    initProperties.app.version = pkg.version;

    // Récupération des assets
    const assets = exportAssets;

    // Initialisation des assets
    this.initGlobalPropertiesFiles(initProperties, assets);

    return initProperties;

  }

}

export const properties = new PropertiesConfiguration().initGlobalProperties();
