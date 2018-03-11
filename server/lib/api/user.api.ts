import { NextFunction, Response, Request, Router } from 'express';

import { User } from '../../modules/user/models/user';

export class UserApi {

  // Exposition des api du user
  public static create(router: Router) {

    router.post('/api/users', (req: Request, res: Response, next: NextFunction) => {
      new UserApi().create(req, res, next);
    });
  }

  // Méthodes associées aux api user
  public create(req: Request, res: Response, next: NextFunction) {
    const _user = new User(req.body);
    _user.provider = 'local';
    _user.displayName = `${_user.firstName}, ${_user.lastName}`;
    _user.save()
      .then(user => {
        res.json(user.toObject());
        next();
      })
      .catch(next);
  }

}
