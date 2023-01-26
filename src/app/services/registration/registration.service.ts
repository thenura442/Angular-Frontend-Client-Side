import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../_interfaces/student';

const API_URL = 'http://localhost:5500/api/user/';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: Student) : Observable<Student> {
    return this.http.post<Student>('http://localhost:5500/api/user/register',userSettings);
  }

  findId(body: any) : any {
    return this.http.post('http://localhost:5500/api/user/get/id', body);
  }

  updateBody(updatedUserSettings: Student) : Observable<Student>  {
    return this.http.put<Student>('http://localhost:5500/api/user/update/id', updatedUserSettings);
  }

  deleteUser(deleteSettings: Student) : Observable<Student> {
    return this.http.post<Student>('http://localhost:5500/api/user/delete/id', deleteSettings);
  }

}
