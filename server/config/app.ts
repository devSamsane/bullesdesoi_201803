import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compress from 'compression';
import * as path from 'path';
import * as http from 'http';

import * as properties from './properties/dev.properties';

/**
 * Définition du Server
 * @export
 * @class Server
 */
export class Server {

  // Définition de la variable app
  public app: express.Application;

  constructor() {
    // Création de l'application express
    this.app = express();

    // Injection des routes
    this.mountRoutes();

    // Initialisation des middlewares
    this.middlewares();

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
   * Initialisation des middlewares
   * @method middlewares
   * @private
   * @memberof Server
   */
  private middlewares() {

    // Initialisation compression
    this.app.use(compress({ filter: (req, res) => {
      return /json|text|javascript|css|font|svg/.test(res.getHeader('Content-Type'));
    },
    level: 9
    }));

    // Ajout des répertoires statiques
    this.app.use(express.static(path.join(__dirname, 'public')));

    // Initialisation body-parser
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // Initialisation cookie-parser
    this.app.use(cookieParser());

    // Autorisation Access-Control-Allow-Origin
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin X-Requested-With Content-Type');
      next();
    });

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
      res.json({ message: 'Hello World' });
    });

    this.app.use('/', router);

  }

}

