import * as fs from 'fs';
import * as _ from 'lodash';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import { Properties } from '../interfaces/properties.interface';
const properties: Properties = require('../config/index');


export class Logger {

  public logger;
  public loggerExpress;

  constructor() { }


  private setupFileLogger(): any {
    // Clone des properties
    const _properties = _.clone(properties);

    // Définition du noeud de configuration log des properties
    const loggerProperties = _properties.config.log.fileLogger;

    // Vérification que le noeud est renseigné
    if (!_.has(_properties, 'config.log.fileLogger.directoryPath') || !_.has(
      _properties, 'config.log.fileLogger.filename'
    )) {
      console.warn(`Erreur: Noeud de configuration logger introuvable`);
      return false;
    }

    // Paramétrage du répertoire et du fichier de log
    const loggerPath = `${loggerProperties.directoryPath}/${loggerProperties.filename}`;

    // Instanciation du fichier de log
    if (!fs.openSync(loggerPath, 'a+')) {
      throw new Error(`Erreur: Instanciation du fichier de log impossible`);
    }

    return {
      level: 'debug',
      colorize: false,
      filename: loggerPath,
      timestamp: true,
      maxsize: loggerProperties.maxsize ? loggerProperties.maxsize : 10485760,
      maxFiles: loggerProperties.maxFiles ? loggerProperties.maxFiles : 2,
      json: (_.has(loggerProperties, 'json')) ? loggerProperties.json : true,
      eol: '/n',
      tailable: true,
      showLevel: true,
      humanReadableUnhandledException: true
    };
  }


  /**
   *
   *
   * @returns {*}
   * @memberof Logger
   */
  public logExpress(): any {

    if (this.loggerExpress) {
      return this.loggerExpress;
    }

    // Définition des options du fichier de log
    const fileLoggerTransport = this.setupFileLogger();

    this.loggerExpress = expressWinston.logger({
      transports: [
        new winston.transports.Console({
          level: 'info',
          json: false,
          colorize: true
        }),
        new winston.transports.File({
          level: fileLoggerTransport.level,
          colorize: fileLoggerTransport.colorize,
          filename: fileLoggerTransport.filename,
          timestamp: fileLoggerTransport.timestamp,
          maxsize: fileLoggerTransport.maxsize,
          maxFiles: fileLoggerTransport.maxFiles,
          json: fileLoggerTransport.json,
          eol: fileLoggerTransport.eol,
          tailable: fileLoggerTransport.tailable,
          showLevel: fileLoggerTransport.true,
          humanReadableUnhandledException:
            fileLoggerTransport.humanReadableUnhandledException
        })
      ],
      expressFormat: true,
      colorize: true,
      meta: true // tslint:disable-line
    });

    return this.loggerExpress;

  }

}
