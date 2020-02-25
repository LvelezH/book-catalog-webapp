import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BooksListComponent} from './catalog/books/booklist.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {BookDetailsComponent} from './catalog/books/bookdetails.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NewBookComponent} from './catalog/books/newbook.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './authentication/login.component';
import {MatCardModule} from '@angular/material/card';
import {AuthenticationGuard} from './authentication/AuthenticationGuard';
import {StorageService} from './authentication/storage.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationsPopupComponent} from './notifications/notifications.popup.component';
import {CatalogComponent} from './catalog/catalog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

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
  entryComponents: [
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    AuthenticationGuard,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
