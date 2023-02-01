import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from '../../_interfaces/assignment';


//const URL = 'http://localhost:5500/';
const URL = 'https://cmc-dle-backend.onrender.com/';
const PATH = 'api/assignment/';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {



  constructor(private http: HttpClient) { }

  postAssignmentForm(assignmentSettings: Assignment) : Observable<Assignment> {
    return this.http.post<Assignment>(URL+PATH+'register',assignmentSettings);
  }

  findId(body: any) : any {
    return this.http.post(URL+PATH+'get/id', body);
  }

  updateAssignment(assignmentSettings: Assignment) : Observable<Assignment>  {
    return this.http.put<Assignment>(URL+PATH+'update/id', assignmentSettings);
  }

  deleteAssignment(deleteSettings: Assignment) : Observable<Assignment> {
    return this.http.post<Assignment>(URL+PATH+'delete/id', deleteSettings);
  }

  getAssignments(body: any) : any {
    return this.http.post(URL+PATH+'get/assignments', body);
  }
}
