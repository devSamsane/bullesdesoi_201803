import * as express from 'express';
import * as path from 'path';
import * as http from 'http';

import { initMiddlewares } from './helpers/app-middleware';

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

    // Initialisation des middlewares
    initMiddlewares(this.app);

    // Injection des routes
    this.mountRoutes();
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
   * Initialisation des routes
   * @method mountRoutes
   * @private
   * @memberof Server
   */
  private mountRoutes(): void {

    const router = express.Router();

    router.get('/', (req, res) => {
      res.json({ message: 'Bulles de soi' });
    });

    this.app.use('/', router);

  }

}

