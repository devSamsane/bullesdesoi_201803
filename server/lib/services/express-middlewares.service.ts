import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as compress from 'compression';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as helmet from 'helmet';

import { properties } from './../config/index';


export class ExpressMiddlewares {

  constructor() { }

  /**
   * Configuration des variables locales de l'application express
   * @method initLocalVariables
   * @static
   * @param {express.Application} app
   * @memberof Middlewares
   */
  private initLocalVariables(app: express.Application) {
    app.locals.title = properties.app.title;
    app.locals.description = properties.app.description;
    app.locals.keywords = properties.app.keywords;
    app.locals.env = properties.app.env;
    app.locals.domain = properties.server.domain;

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.host = `${req.protocol}://${req.hostname}`;
      res.locals.url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
      next();
    });
  }

  /**
   * Initialisation des middlewares express
   * @method initMiddlewares
   * @static
   * @param {express.Application} app
   * @memberof ExpressApplication
   */
  private initMiddlewares(app: express.Application) {

    // Initialisation du middleware: COMPRESSION
    app.use(compress({
      filter: (req: Response, res: Response) => {
        const filterHeader: RegExp = /json|text|javascript|css|font|svg/;
        const header = res.getHeader('Content-Type');
        return filterHeader.test(header.toString());
      },
      level: 9
    }));

    // Initialisation du middleware: BODY-PARSER
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    // Initialisation du middleware: METHOD-OVERRIDE
    app.use(methodOverride());

    // Autorisation Allow-Origin
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin X-Requested-With Content-Type');
      next();
    });

  }

  /**
   * Initialisation de Helmet, protection des headers
   * @method initHelmetHeaders
   * @static
   * @param {express.Application} app
   * @memberof ExpressApplication
   */
  private initHelmetHeaders(app: express.Application) {

    // Expiration HTTP Strict Transport Security - 6 mois
    const MAX_AGE = 15778476000;

    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
      maxAge: properties.config.helmet.hsts.expiration,
      includeSubdomains: properties.config.helmet.hsts.includeSubdomains,
      force: properties.config.helmet.hsts.force
    }));
    app.use(helmet.hidePoweredBy());
  }


  /**
   * Initialisation de l'application express
   * @method init
   * @static
   * @returns app: express.Application
   * @memberof ExpressApplication
   */
  public init(app: express.Application) {

    // Initialisation des variables locales
    this.initLocalVariables(app);

    // Initialisation des middlewares
    this.initMiddlewares(app);

    // Initialisation de HELMET
    this.initHelmetHeaders(app);

  }

}
