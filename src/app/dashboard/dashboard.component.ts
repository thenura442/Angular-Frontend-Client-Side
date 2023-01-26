import { Component, OnInit } from '@angular/core';
import { Subject } from '../_interfaces/subject';
import { StorageService } from '../services/storage/storage.service';
import { SubjectService } from '../services/subject/subject.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private storageService: StorageService, private subjectService:SubjectService){}

  orginalBody: any = {}

  body: any = {...this.orginalBody}


  orginalSubjectSettings: Subject = {
    _id: "",
    name: "",
    description: "",
    lecturer_id: "",
    grade: "",
    url: "Stringgag/agsgag"
  }

  subjectSettings: Subject = {...this.orginalSubjectSettings}


  list: any[] = []

  ngOnInit(): void {
    let user = this.storageService.getUser()
    this.body.grade = user.grade;
    if(user.type == 'student'){
      this.getSubjects(this.body);
    }
  }

  getSubjects(body: any): any {
    this.subjectService.getStudentSubjects(body).subscribe((result: any) => {
      if(result == null || Object.hasOwn(result,'Error')) {
        console.log(result);
      }
      else{
        this.list = result;
        console.log(this.list);
      }
    })
  }
}
