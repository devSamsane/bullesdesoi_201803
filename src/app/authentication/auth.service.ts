import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class AuthService {
  private subject = new BehaviorSubject<User>(undefined);
  private readonly url = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected http: HttpClient) {}

  signup(user: User): Observable<{} | User> {
    const body = JSON.stringify(user);
    return this.http
      .post<User>(`${this.url}api/users`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Error Handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.'
    );
  }

  // Récupération des données en retour
  private extractObject(res: Response): Object {
    const data: any = res.json();
    console.log(data);
    return data || {};
  }
}
