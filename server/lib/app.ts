import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as rp from 'request-promise';
import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';

import { ExpressMiddlewares } from './services/express-middlewares.service';
import { Logger } from './services/logger.service';
import { MongooseService } from './services/mongoose.service';
import { connection } from 'mongoose';
import { properties } from './config/index';
import { UserApi } from './api/user.api';
import { ServicesApi } from './api/services.api';

const expressMiddlewares = new ExpressMiddlewares();
const expressLogger = new Logger().logExpress();
const dbConnection = new MongooseService();

/**
 * Définition du Server
 * @export
 * @class Server
 */
export class Server {

  // Définition de la variable app
  public app: express.Application;
  public properties;

  constructor() {
                  // Création de l'application express
                  this.app = express();

                  // Initialisation du logger
                  this.app.use(expressLogger);

                  // Initialisation de la connexion mongoose
                  this.startMongoose();
                  this.initializeModels();

                  // Initialisation des middlewares
                  this.middlewares(this.app);

                  // Injection des api
                  this.api();
                }

  /**
  * Bootstrap application express
  * @method bootstrap
  * @static
  * @returns {Server} Nouvelle instance de la class Server
  * @memberof Server
  */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   *Initialisation de l'instance mongoose
   *@method startMongoose
   * @private
   * @memberof Server
   */
  private startMongoose() {
    dbConnection.connect();
  }
  /**
   * Initialisation des models
   * @method initializeModels
   * @private
   * @memberof Server
   */
  private initializeModels() {
      dbConnection.loadModels();
    }

  /**
   * Exposition de l'initialisation middlewares
   * @method middlewares
   * @private
   * @param {express.Application} app
   * @memberof Server
   */
  private middlewares(app: express.Application): void {
    expressMiddlewares.init(app);
  }


  public api() {
    const router = express.Router();

    // Création des api user
    UserApi.create(router);
    ServicesApi.create(router);

    this.app.use(router);
  }
}
