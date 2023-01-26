import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from '../../_interfaces/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http: HttpClient) { }

  postAssignmentForm(assignmentSettings: Assignment) : Observable<Assignment> {
    return this.http.post<Assignment>('http://localhost:5500/api/assignment/register',assignmentSettings);
  }

  findId(body: any) : any {
    return this.http.post('http://localhost:5500/api/assignment/get/id', body);
  }

  updateAssignment(assignmentSettings: Assignment) : Observable<Assignment>  {
    return this.http.put<Assignment>('http://localhost:5500/api/assignment/update/id', assignmentSettings);
  }

  deleteAssignment(deleteSettings: Assignment) : Observable<Assignment> {
    return this.http.post<Assignment>('http://localhost:5500/api/assignment/delete/id', deleteSettings);
  }

  getAssignments(body: any) : any {
    return this.http.post('http://localhost:5500/api/assignment/get/assignments', body);
  }
}
