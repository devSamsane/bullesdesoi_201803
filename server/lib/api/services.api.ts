import { NextFunction, Response, Request, Router } from 'express';
import * as rp from 'request-promise';
import { properties } from '../config';

export class ServicesApi {

  /**
   * Méthode d'exposition des api REST de service
   * @name exposeRoutes
   * @static
   * @param {Router} router Router Express
   * @memberof ServicesApi
   */
  public static exposeRoutes(router: Router) {

    // Route Recaptcha
    router.get('/api/recaptcha', (req: Request, res: Response, next: NextFunction) => {
      new ServicesApi().verifyRecaptchaController(req, res, next);
    });

    // Route test backend OK
    router.get('/', (req: Request, res: Response) => {
      new ServicesApi().testServer(req, res);
    });

  }


  /**
   * Méthode de vérification du captcha auprès de Google
   * @name verifyRecaptchaController
   * @private
   * @param {Request} req Resquest Express
   * @param {Response} res Response Express
   * @param {NextFunction} next NextFunction Express
   * @memberof ServicesApi
   */
  private verifyRecaptchaController(req: Request, res: Response, next: NextFunction) {
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
  }

  /**
   * Méthode de renvoi de message pour vérifier backend est OK
   * @deprecated Pour la mise en production
   * @private
   * @param {Request} req Request Express
   * @param {Response} res Response Express
   * @memberof ServicesApi
   */
  private testServer(req: Request, res: Response) {
    res.cookie('test', 'Test store cookie', { httpOnly: true, maxAge: 900000 });
    res.json({ message: 'Backend bullesdesoi opérationnel' });
  }

}
