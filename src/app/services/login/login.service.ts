import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/interfaces/login-user';

const API = 'http://localhost:5500/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginUser): Observable<LoginUser> {
    return this.http.post<LoginUser>(API + 'login',loginForm,httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(API + 'logout',{},httpOptions);
  }
}
