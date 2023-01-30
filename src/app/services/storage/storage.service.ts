import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public USER: any = {}
  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(body: any): void {
    window.sessionStorage.removeItem(this.USER);
    window.sessionStorage.setItem(this.USER, body);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER);
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
    const user = window.sessionStorage.getItem(this.USER);
    if (user != null) {
      return true;
    }

    return false;
  }


  public logOut(): void {
    window.sessionStorage.removeItem(this.USER);
  }
}
