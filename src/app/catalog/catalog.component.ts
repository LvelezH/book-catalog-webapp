import {Component} from '@angular/core';
import {StorageService} from '../authentication/storage.service';

@Component({
  selector: 'app-catalog',
  templateUrl: 'catalog.component.html',
  styleUrls: ['catalog.component.css'],
})
export class CatalogComponent {

  constructor(private storageService: StorageService) { }

  logOut() {
    this.storageService.logout();
  }
}
