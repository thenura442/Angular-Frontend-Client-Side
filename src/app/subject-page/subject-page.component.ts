import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from '../services/assignment/assignments.service';
import { StorageService } from '../services/storage/storage.service';
import { SubjectService } from '../services/subject/subject.service';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.css']
})
export class SubjectPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private storageService: StorageService, private assignmentService: AssignmentsService, private subjectService: SubjectService){}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    let user = this.storageService.getUser();
    let grade = user.grade;
    this.assignmentService.getAssignments({subject: id, grade: grade}).subscribe((result : any) => {
      console.log(result);
    })

    this.subjectService.findId({_id:id}).subscribe((result : any) => {
      console.log(result);
    })
  }
}
