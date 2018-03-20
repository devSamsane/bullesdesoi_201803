import * as path from 'path';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as compress from 'compression';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as helmet from 'helmet';

import { Properties } from '../interfaces/properties.interface';
const properties: Properties = require('../config/index');


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
    if (properties.server.secure.ssl === true) {
      app.locals.secure = properties.server.secure.ssl;
    }
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
   * @param {express.Application} app Express
   * @memberof ExpressApplication
   */
  private initMiddlewares(app: express.Application) {

    // Initialisation du middleware: COMPRESSION
    app.use(compress({
      filter: (req: Response, res: Response) => {
        const headerType: string | string[] = (['Content-Type']);
        return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-type'));// tslint:disable-line
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

    app.use(cookieParser());

    // Autorisation Allow-Origin
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   res.setHeader('Access-Control-Allow-Credentials', 'true');
    //   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, X-Access-Token, Content-Type');
    //   next();
    // });

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Set-Cookie, Accept, X-Access-Token');
      res.setHeader('methods', 'GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE');
      res.setHeader('preflightContinue', 'false');
      res.setHeader('credentials', 'true');
      next();
    });

  }

  // private initPassportConfiguration(app: express.Application) {
  //   app.use(passport.initialize());
  //   app.use(passport.session());
  // }

  // private initPassportStrategiesConfiguration() {
  //   console.log('properties', properties.files.server);
  //   properties.files.server.strategies.forEach(configPath => {
  //     console.log(configPath);
  //     require(path.resolve(configPath));
  //   });
  // }

  // private initModulesConfiguration(app) {
  //   properties.files.server.configs.forEach(configPath => {
  //     require(path.resolve(configPath))(app);
  //   });
  // }

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
   * Initialisation d'express-session
   * @name initSession
   * @private
   * @param {express.Application} app
   * @memberof ExpressMiddlewares
   */
  // private initSession(app: express.Application) {
  //   app.use(session({
  //     saveUninitialized: true,
  //     resave: true,
  //     secret: 'secret_dev',
  //     cookie: {
  //       domain: 'localhost',
  //       maxAge: 24 * (60 * 60 * 1000),
  //       httpOnly: true,
  //       secure: false
  //     },
  //     name: 'sessionId',
  //     store: new MongoStore({
  //       url: properties.config.db.uri,
  //       mongoOptions: '',
  //       collection: 'sessions',

  //     })
  //   }));
  // }


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
    // this.initHelmetHeaders(app);

    // Initialisation de la configuration des modules
    // this.initModulesConfiguration(app);

    // Initialisation de la configuration passport
    // this.initPassportConfiguration(app);

    // Initialisation des strategies
    // this.initPassportStrategiesConfiguration();

    // Initialisation de la session
    // this.initSession(app);

  }

}

