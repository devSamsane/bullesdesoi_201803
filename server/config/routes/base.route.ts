import { Request, Response, NextFunction } from 'express';

import { properties } from '../helpers/app-properties';


export class BaseRoute {
  protected title: string;

  constructor() {
    this.title = properties.app.title;
  }

  public render(req: Request, res: Response, view: string, options?: Object) {
    res.locals.BASE_URL = '/';
    res.locals.title = this.title;

    res.render(view, options);
  }

}
