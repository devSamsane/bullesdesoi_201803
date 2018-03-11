// router.get('/api/recaptcha', (req: Request, res: Response) => {
//   const options = {
//     method: 'POST',
//     uri: 'https://www.google.com/recaptcha/api/siteverify',
//     qs: {
//       secret: properties.config.recaptcha.secret,
//       response: req.query.token
//     },
//     json: true
//   };

//   rp(options)
//     .then(response => res.json(response))
//     .catch(() => {});
// });

import { NextFunction, Response, Request, Router } from 'express';
import * as rp from 'request-promise';
import { properties } from '../config';

export class ServicesApi {

  // Exposition des api du user
  public static create(router: Router) {

    // Recaptcha
    router.get('/api/recaptcha', (req: Request, res: Response, next: NextFunction) => {
      new ServicesApi().verifyRecaptcha(req, res, next);
    });

    // Test server ok
    router.get('/', (req: Request, res: Response) => {
      new ServicesApi().testServer(req, res);
    });

  }

  // Déclaration des controllers

  // Vérification du captcha
  private verifyRecaptcha(req: Request, res: Response, next: NextFunction) {
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

  // Test server ok
  private testServer(req: Request, res: Response) {
    res.json({ message: 'Backend bullesdesoi opérationnel' });
  }



}
