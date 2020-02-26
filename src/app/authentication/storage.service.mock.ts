import {Injectable} from '@angular/core';
import {User} from './user';

@Injectable()
export class StorageServiceMock {
  private localStorageService;

  constructor() {
    this.localStorageService = localStorage;
  }

  setCurrentUser(user: User): void {
  }
}
