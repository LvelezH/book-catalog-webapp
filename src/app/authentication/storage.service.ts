import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {User} from './user';
@Injectable()
export class StorageService {
  private localStorageService;
  private currentUser: User = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentUser = this.loadSessionData();
  }

  loadSessionData(): User {
    const user = this.localStorageService.getItem('currentUser');
    return (user) ? JSON.parse(user) as User : null;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    this.localStorageService.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return (this.getCurrentUser() != null);
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
