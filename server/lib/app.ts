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

    // Injection des routes
    this.routes();
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

  /**
   * Initialisation des routes
   * @method routes
   * @private
   * @memberof Server
   */
  private routes(): void {

    const router = express.Router();
    router.get('/', (req: Request, res: Response) => {
      res.json({ message: 'backend Bulles de Soi'});
    });

    // ReCaptchaRoute
    router.get('/api/recaptcha', (req: Request, res: Response) => {
      const options = {
        method: 'POST',
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        qs: {
          secret: properties.config.recaptcha.secret,
          response: req.query.token
        },
        json: true
      };

      rp(options)
        .then(response => res.json(response))
        .catch(() => { });
    });

    this.app.use(router);
  }

}
