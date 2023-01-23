import { Injectable } from '@angular/core';

const USER_ID = '';
const USER_EMAIL = '';
const USER_TYPE = '';

const USER: any = {}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(body: any): void {
    window.sessionStorage.removeItem(USER);
    window.sessionStorage.setItem(USER, body);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER);
    if (user != null) {
      return JSON.parse(user);
    }

    return null;
  }

  // public getType(): any {
  //   const type = window.sessionStorage.getItem(USER_TYPE);
  //   if (type != null && type != 'auth-type') {
  //     return type;
  //   }

  //   return null;
  // }

  // public getEmail(): any {
  //   const email = window.sessionStorage.getItem(USER_EMAIL);
  //   if (email != null && email != 'auth-type') {
  //     return email;
  //   }

  //   return null;
  // }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER);
    if (user != null) {
      return true;
    }

    return false;
  }


  public logOut(): void {
    window.sessionStorage.removeItem(USER);
  }
}
