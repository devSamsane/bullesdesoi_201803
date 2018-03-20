import { NextFunction, Response, Request, Router } from 'express';
import * as Cookie from 'cookie';
import * as argon2 from 'argon2';
import * as passport from 'passport';

import { SecurityHelper } from '../helpers/security.helper';
import { User, UserModel } from '../../modules/user/models/user';
import {
  UserAuthenticationController
} from '../../modules/user/controllers/users.authentication.controller';
import { UserService } from '../../modules/user/services/user.service';



export class UserApi {

  constructor() { }

  /**
   * Méthode d'exposition des api REST du user
   * @name exposeRoutes
   * @static
   * @param {Router} router express Router
   * @memberof UserApi
   */
  public static exposeRoutes(router: Router) {

    router.post('/api/auth/signup', (req: Request, res: Response) => {
      this.createUser(req, res);
    });

    router.post('/api/auth/signin',
      (req: Request, res: Response) => {
        UserAuthenticationController.signin(req, res);
    });
  }

  private static async createUser(req, res) {
    const reqUser: UserModel = req.body;

    this.createUserAndSession(res, req, reqUser)
      .catch((error) => res.status(500).json({
        message: 'Erreur du serveur',
        error: error
      }));
  }

  private static async createUserAndSession(res: Response, req: Request, userToSore: UserModel) {
    // Enregistrement du user en base
    const user: UserModel = await UserService.signup(userToSore);

    // Création du token d'authentification
    const sessionToken = await SecurityHelper.createSessionToken(user.id.toString());

    // Création du token csrf
    const csrfToken = await SecurityHelper.createCsrfToken(sessionToken);

    // Création des cookies
    res.cookie('sessionId', sessionToken, { httpOnly: true, maxAge: 900000, path: '/', domain: 'localhost', secure: true });
    res.cookie('csrf-token', csrfToken, { httpOnly: true, maxAge: 900000, path: '/', domain: 'localhost', secure: true });

    // Renvoi de la réponse au client
    res.status(200).json({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      created: user.created
    });
  }













}
