import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import { Request, Response } from 'express';

import { ExpressMiddlewares } from './services/express-middlewares.service';
import { Logger } from './services/logger.service';

const expressMiddlewares = new ExpressMiddlewares();
const expressLogger = new Logger().logExpress();


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

    this.app.use(router);
  }

}
