import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

@Injectable()
export class UsersService {

  private readonly url = 'http://localhost:3000/api/users';

  constructor(protected http: Http) { }

  public create(user: User): Observable<User> {
    return this.http
      .post(this.url, user)
      .map(this.extractObject);
  }

  private extractObject(res: Response): any {
    const data: any = res.json();
    return data || {};
  }
}
