import { NextFunction, Request, Response, Router } from 'express';

import { BaseRoute } from '../../../config/routes/base.route';

export class IndexRoute extends BaseRoute {

  constructor() { super(); }

  public static create(router: Router) {
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
  }

  public index(req: Request, res: Response, next: NextFunction) {
    this.render(req, res, 'index');
  }
}
