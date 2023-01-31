import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/_interfaces/employee';
import { Student } from '../../_interfaces/student';

const URL = 'http://localhost:5500/';
const PATH = 'api/user/';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: Student) : Observable<Student> {
    return this.http.post<Student>(URL+PATH+'register',userSettings);
  }

  findId(body: any) : any {
    return this.http.post(URL+PATH+'get/id', body);
  }

  updateBody(updatedUserSettings: Student) : Observable<Student>  {
    return this.http.put<Student>(URL+PATH+'update/id', updatedUserSettings);
  }

  deleteUser(deleteSettings: Student) : Observable<Student> {
    return this.http.post<Student>(URL+PATH+'delete/id', deleteSettings);
  }

  postEmployeeSettingsForm(userSettings: Employee) : Observable<Employee> {
    return this.http.post<Employee>(URL+PATH+'register',userSettings);
  }

  findEmployeeId(body: any) : any {
    return this.http.post(URL+PATH+'get/id', body);
  }

  updateEmployeeBody(updatedUserSettings: Employee) : Observable<Employee>  {
    return this.http.put<Employee>(URL+PATH+'update/id', updatedUserSettings);
  }

  deleteEmploee(deleteSettings: Employee) : Observable<Employee> {
    return this.http.post<Employee>(URL+PATH+'delete/id', deleteSettings);
  }

}
