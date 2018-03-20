import { Request, Response, NextFunction } from 'express';
import * as argon2 from 'argon2';

import { UserModel } from '../models/user';
import { UserService } from '../services/user.service';
import { SecurityHelper } from '../../../lib/helpers/security.helper';
import { Properties } from '../../../lib/interfaces/properties.interface';
const properties: Properties = require('../../../lib/config/index');

export class UserAuthenticationController {


  static async signin(req: Request, res: Response) {
    const credentials: any = req.body;

    const user: UserModel = await UserService.getUserByEmail(credentials.email.toString());

    if (!user) {
      res.status(403);
    } else {
      this.buildSigninResponse(credentials, user, res);
    }

  }

  static async buildSigninResponse(credentials: any, user: UserModel, res: Response) {

    try {
      const sessionToken: string = await this.trySignin(credentials, user);

      const csrfToken: string = await new SecurityHelper().createCsrfToken(sessionToken);

      res.cookie('sessionId', sessionToken, {
        httpOnly: true,
        secure: false,
        maxAge: 900000,
        path: '/',
        domain: 'http://localhost'
      });
      res.cookie('xsrf-token', csrfToken, { httpOnly: true, secure: false });

      res.status(200).json({
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        created: user.created
      });

    } catch (error) {
      res.status(403);
    }
  }

  static async trySignin(credentials: any, user: UserModel) {

    const isPasswordValid: boolean = await argon2.verify(user.password, credentials.password);

    if (!isPasswordValid) {
      throw new Error('Mot de passe invalide');
    }

    return new SecurityHelper().createSessionToken(user.id.toString());
  }

  static async createUserAndSession(res: Response, reqUser: UserModel) {

    const user: UserModel = await UserService.signup(reqUser);

    const sessionToken: string = await new SecurityHelper().createSessionToken(user.id.toString());

    const csrfToken: string = await new SecurityHelper().createCsrfToken(sessionToken);

    res.cookie('sessionId', sessionToken, { httpOnly: true, secure: false });
    res.cookie('xsrf-token', csrfToken, { httpOnly: true, secure: false });

    res.status(200).json({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      created: user.created
    });
  }

}
