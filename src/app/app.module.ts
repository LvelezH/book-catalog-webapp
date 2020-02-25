import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './authentication/login.component';
import {StorageService} from './authentication/storage.service';
import {AuthenticationGuard} from './authentication/AuthenticationGuard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BooksListComponent} from './catalog/books/booklist.component';
import {NewBookComponent} from './catalog/books/newbook.component';
import {BookDetailsComponent} from './catalog/books/bookdetails.component';
import {CatalogComponent} from './catalog/catalog.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationsPopupComponent} from './notifications/notifications.popup.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailsComponent,
    NewBookComponent,
    LoginComponent,
    NotificationsComponent,
    CatalogComponent,
    NotificationsPopupComponent
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
