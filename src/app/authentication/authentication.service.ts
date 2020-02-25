import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from './user';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = 'http://localhost:8080/users/';

  constructor(protected http: HttpClient) { }

  public login(user: User): Observable<any> {
    return this.http.post(this.baseUrl , user)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `API returned error code ${error.status}, ` +
        `error was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
