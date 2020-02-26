import {fakeAsync, inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticationService} from '../../app/authentication/authentication.service';
import {User} from '../../app/authentication/user';
import {of} from 'rxjs';

describe('Authentication service', () => {
  let authenticationService: AuthenticationService;
  let httpMock: HttpTestingController;

  const user: User = {
    username: 'username',
    password: 'password'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthenticationService
      ],
    });

    authenticationService = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should check user login is valid`, fakeAsync(inject([HttpTestingController, AuthenticationService],
    (httpClient: HttpTestingController, service: AuthenticationService) => {
      const resp = of(true);

      service.login(user).subscribe((loggedIn) => {
        expect(loggedIn).toEqual(resp);
      });

      const  request = httpMock.expectOne('http://localhost:8080/users/');
      expect(request.request.method).toBe('POST');
      request.flush(resp);
      httpMock.verify();
    })));
});
