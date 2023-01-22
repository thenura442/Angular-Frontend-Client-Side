import { Injectable } from '@angular/core';

const USER_ID = 'auth-id';
const USER_EMAIL = 'auth-email';
const USER_TYPE = 'auth-type';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: string, email: string , type: string): void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.removeItem(USER_EMAIL);
    window.sessionStorage.removeItem(USER_TYPE);
    window.sessionStorage.setItem(USER_ID, user);
    window.sessionStorage.setItem(USER_EMAIL, email);
    window.sessionStorage.setItem(USER_TYPE, type);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_ID);
    if (user) {
      return user;
    }

    return null;
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_ID);
    if (user) {
      window.sessionStorage.removeItem(USER_ID);
      window.sessionStorage.removeItem(USER_EMAIL);
      window.sessionStorage.removeItem(USER_TYPE);
      return true;
    }

    return false;
  }


  public logOut(): boolean {
    const user = window.sessionStorage.getItem(USER_ID);
    if (user) {
      return true;
    }

    return false;
  }
}
