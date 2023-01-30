import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

const API = 'http://localhost:5500/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  USER : any ;
  private dataSub: BehaviorSubject<any>;
  currentData: Observable<any>;

  constructor(private http: HttpClient) {
    this.dataSub = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem("currentData")!)
    );
    this.currentData = this.dataSub.asObservable();
  }

  // public saveUser(body: any): void {
  //   sessionStorage.setItem('currentData',body);
  //   this.dataSub.next(body);
  // }

  public getUser(): any {
    const user = sessionStorage.getItem(this.USER);
    if (user != null) {
      return JSON.parse(user);
    }

    return null;
  }

  public get currentUserValue(): any {
    return this.dataSub.value;
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


  // public isLoggedIn(): boolean {
  //   const user = window.sessionStorage.getItem(this.USER);
  //   if (user != null) {
  //     return true;
  //   }

  //   return false;
  // }


  login(loginForm: any) {
    return this.http.post<any>(API + 'login',loginForm,httpOptions).pipe(
      map(user => {

        if(!Object.hasOwn(user,'Error')){
          const _id = Object.getOwnPropertyDescriptor(user, '_id');
          const email = Object.getOwnPropertyDescriptor(user, 'email');
          const type = Object.getOwnPropertyDescriptor(user, 'type');
          const grade = Object.getOwnPropertyDescriptor(user, 'grade');
          const dle_access = Object.getOwnPropertyDescriptor(user, 'dle_access');

          let body = { _id:_id?.value , email:email?.value , type:type?.value, grade: grade?.value , dle_access: dle_access?.value }

          sessionStorage.setItem("currentData", JSON.stringify(body));
          this.dataSub.next(body);
          sessionStorage.setItem(this.USER, JSON.stringify(body));
          return body;
        }

        return user;
      })
    );
  }

  public loggedIn() : boolean {
    return !!sessionStorage.getItem('currentData');
  }

  public logOut(): any {
    sessionStorage.removeItem('currentData');
    this.dataSub.next(null);
    return this.http.get<any>(API + 'logout');

  }
}
