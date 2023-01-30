import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/_interfaces/employee';
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

  postEmployeeSettingsForm(userSettings: Employee) : Observable<Employee> {
    return this.http.post<Employee>('http://localhost:5500/api/user/register',userSettings);
  }

  findEmployeeId(body: any) : any {
    return this.http.post('http://localhost:5500/api/user/get/id', body);
  }

  updateEmployeeBody(updatedUserSettings: Employee) : Observable<Employee>  {
    return this.http.put<Employee>('http://localhost:5500/api/user/update/id', updatedUserSettings);
  }

  deleteEmploee(deleteSettings: Employee) : Observable<Employee> {
    return this.http.post<Employee>('http://localhost:5500/api/user/delete/id', deleteSettings);
  }

}
