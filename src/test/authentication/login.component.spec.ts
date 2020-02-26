import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from '../../app/authentication/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../../app/authentication/authentication.service';
import {StorageService} from '../../app/authentication/storage.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationServiceMock} from '../../app/authentication/authentication.service.mock';
import {StorageServiceMock} from '../../app/authentication/storage.service.mock';
import {Router} from '@angular/router';

describe('Login component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authenticationServiceMock: AuthenticationServiceMock = new AuthenticationServiceMock();
  const storageServiceMock: StorageServiceMock = new StorageServiceMock();
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockSnackbar = jasmine.createSpyObj(['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        FormsModule,
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: StorageService, useValue: storageServiceMock },
        { provide: Router, useValue: router },
        { provide: MatSnackBar, useValue: mockSnackbar }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login for a valid user', () => {
    component.loginForm.get('username').setValue('username');
    component.loginForm.get('password').setValue('password');

    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not login for an invalid user', () => {
    component.loginForm.get('username').setValue('whatever');
    component.loginForm.get('password').setValue('invalid');

    component.login();
    expect(mockSnackbar.open).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
