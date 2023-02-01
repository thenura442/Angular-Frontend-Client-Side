import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/_interfaces/subject';

//const URL = 'http://localhost:5500/';
const URL = 'https://cmc-dle-backend.onrender.com/';
const PATH = 'api/';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  postSubjectForm(subjectSettings: Subject) : Observable<Subject> {
    return this.http.post<Subject>(URL+PATH+'subject/register',subjectSettings);
  }

  findId(body: any) : any {
    return this.http.post(URL+PATH+'subject/get/id', body);
  }

  updateSubject(subjectSettings: Subject) : Observable<Subject>  {
    return this.http.put<Subject>(URL+PATH+'subject/update/id', subjectSettings);
  }

  deleteSubject(deleteSettings: Subject) : Observable<Subject> {
    return this.http.post<Subject>(URL+PATH+'subject/delete/id', deleteSettings);
  }

  getStudentSubjects(body: any) : any {
    return this.http.post(URL+PATH+'subject/student/subjects', body);
  }

  getLecturerSubjects(lecturer: any): any{
    return this.http.post(URL+PATH+'subject/lecturer/subjects', lecturer);
  }

  getLecturers(body:any):any{
    return this.http.post(URL+PATH+'user/lecturers',body)
  }
}
