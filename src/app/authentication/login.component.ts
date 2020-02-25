import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from './authentication.service';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';
import {User} from './user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private matSnackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.authenticationService.login(new User(this.loginForm.value)).subscribe(
        data => this.correctLogin(data),
        error => this.matSnackBar.open(JSON.parse(error._body), 'Ok'));
    }
  }
  private correctLogin(data: boolean) {
    if (data) {
      this.storageService.setCurrentUser(new User(this.loginForm.value));
      this.router.navigate(['/home']);
    } else {
      this.matSnackBar.open('Invalid login', 'Ok');
      this.router.navigate(['/login']);
    }
  }
}
