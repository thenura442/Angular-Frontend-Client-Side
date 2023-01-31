import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

const URL = 'http://localhost:5500/';
const PATH = 'api/auth/';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  USER : any ;
  private dataSub: BehaviorSubject<any>;
  currentData: Observable<any>;

  constructor(private http: HttpClient) {
    this.dataSub = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentData")!)
    );
    this.currentData = this.dataSub.asObservable();
  }

  public getUser(): any {
    const user = localStorage.getItem(this.USER);
    if (user != null) {
      return JSON.parse(user);
    }

    return null;
  }

  public get currentUserValue(): any {
    return this.dataSub.value;
  }


  login(loginForm: any) {
    return this.http.post<any>(URL+PATH+'login',loginForm).pipe(
      map(user => {

        if(!Object.hasOwn(user,'Error')){
          const _id = Object.getOwnPropertyDescriptor(user, '_id');
          const email = Object.getOwnPropertyDescriptor(user, 'email');
          const type = Object.getOwnPropertyDescriptor(user, 'type');
          const grade = Object.getOwnPropertyDescriptor(user, 'grade');
          const dle_access = Object.getOwnPropertyDescriptor(user, 'dle_access');

          let body = { _id:_id?.value , email:email?.value , type:type?.value, grade: grade?.value , dle_access: dle_access?.value }

          localStorage.setItem("currentData", JSON.stringify(body));
          this.dataSub.next(body);
          localStorage.setItem(this.USER, JSON.stringify(body));
          return body;
        }

        return user;
      })
    );
  }

  public loggedIn() : boolean {
    return !!localStorage.getItem('currentData');
  }

  public logOut():Observable<any> {
    localStorage.removeItem('currentData');
    this.dataSub.next(null);
    return this.http.get<any>(URL+PATH+'logout');

  }
}
