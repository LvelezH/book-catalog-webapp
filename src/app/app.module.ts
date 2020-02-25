import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './authentication/login.component';
import {StorageService} from './authentication/storage.service';
import {AuthenticationGuard} from './authentication/AuthenticationGuard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthenticationGuard,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
