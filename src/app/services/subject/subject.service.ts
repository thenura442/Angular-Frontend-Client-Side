import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/_interfaces/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  postSubjectForm(subjectSettings: Subject) : Observable<Subject> {
    return this.http.post<Subject>('http://localhost:5500/api/subject/register',subjectSettings);
  }

  findId(body: any) : any {
    return this.http.post('http://localhost:5500/api/subject/get/id', body);
  }

  updateSubject(subjectSettings: Subject) : Observable<Subject>  {
    return this.http.put<Subject>('http://localhost:5500/api/subject/update/id', subjectSettings);
  }

  deleteSubject(deleteSettings: Subject) : Observable<Subject> {
    return this.http.post<Subject>('http://localhost:5500/api/subject/delete/id', deleteSettings);
  }

  getStudentSubjects(body: any) : any {
    return this.http.post('http://localhost:5500/api/subject/student/subjects', body);
  }

  getLecturerSubjects(lecturer: any): any{
    return this.http.post('http://localhost:5500/api/subject/lecturer/subjects', lecturer);
  }
}
