import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: Student) : Observable<Student> {

    return this.http.post<Student>('http://localhost:5500/api/user/register',userSettings);

  }

}
