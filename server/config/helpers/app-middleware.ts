import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as compress from 'compression';
import * as helmet from 'helmet';
import * as path from 'path';


export const initMiddlewares = (app: express.Application) => {

  const SIX_MONTHS = 15778476000;

  // Initialisation compression
  app.use(compress({ filter: (req, res) => {
    return /json|text|javascript|css|font|svg/.test(res.getHeader('Content-Type'));
  },
  level: 9
  }));

  // Ajout des répertoires statiques
  app.use(express.static(path.join(__dirname, 'public')));

  // Initialisation body-parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Initialisation cookie-parser
  app.use(cookieParser());

  // Autorisation Access-Control-Allow-Origin
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin X-Requested-With Content-Type');
    next();
  });

  // Initialisation helmet
  app.use(helmet.frameguard()); // Protection clickjacking
  app.use(helmet.xssFilter()); // Protection XSS (faible)
  app.use(helmet.noSniff()); // Protection sniffing MIME type
  app.use(helmet.ieNoOpen()); // Configuration X-Download-Options IE8+
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSubdomains: true,
    force: true
  }));
  app.use(helmet.hidePoweredBy()); // Ne pas afficher x-powered-by


};
