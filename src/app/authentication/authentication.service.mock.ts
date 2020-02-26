import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceMock {
  public login(user: User): Observable<any> {
    if (user.password === 'password') {
      return of(true);
    } else {
      return of(false);
    }
  }
}
